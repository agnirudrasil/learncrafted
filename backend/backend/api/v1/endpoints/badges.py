from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.api.deps import get_db
from backend.models.badge import Badge
from backend.schemas.badges import Badges

router = APIRouter()


@router.get("/", response_model=list[Badges])
def get_badges(db: Session = Depends(get_db)):
    return db.scalars(select(Badge)).all()
