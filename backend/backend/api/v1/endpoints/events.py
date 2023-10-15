import datetime
from typing import List, cast, Optional
from pydantic import AwareDatetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.orm import Session
from starlette import status

from backend.api.deps import get_db, get_current_user
from backend.core.snowflake import snowflake_id
from backend.models import Event, User
from backend.schemas.events import Events, CreateEvent

router = APIRouter()


@router.get("/",
            response_model=List[Events])
async def get_events(
        start: Optional[AwareDatetime] = None,
        db: Session = Depends(get_db),
        user: User = Depends(get_current_user)
):
    stmt = select(Event).where(Event.user_id == user.id)
    if start:
        stmt = stmt.where(func.extract("DAY", (start - Event.start)) <= 7)
    else:
        stmt = stmt.where(func.extract("DAY", (func.now() - Event.start)) <= 7)
    events = db.scalars(stmt).all()

    return events


@router.put("/",
            response_model=Events)
async def create_event(
        data: CreateEvent,
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    event = Event(
        id=next(snowflake_id),
        user_id=user.id,
        name=data.name,
        description=data.description,
        colour=data.colour,
        start=data.start,
        end=data.end,
        repeat=data.repeat
    )
    db.add(event)
    db.commit()

    return event


@router.delete("/{e_id}",
               status_code=204)
async def delete_event(
        e_id: int,
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    event = db.scalars(select(Event).where(Event.id == e_id).where(Event.user_id == user.id)).first()
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unknown Event")
    db.delete(event)
    db.commit()
    return
