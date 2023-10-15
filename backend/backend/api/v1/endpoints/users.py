import sqlalchemy.exc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette import status

from backend.api.deps import get_current_user, get_db
from backend.models.badge import Badge
from backend.models.user import User
from backend.schemas.users import Users
from backend.tasks import Events
from backend.tasks.tasks import update_progress

router = APIRouter()


@router.get("/@me",
            response_model=Users)
def get_me(
        user: User = Depends(get_current_user)
):
    return user


@router.put("/@me/badges/{b_id}", status_code=204)
def purchase_badge(
        b_id: int,
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    badge = db.scalars(select(Badge).where(Badge.id == b_id)).first()
    if badge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unknown Badge")
    if badge.cost > user.coins:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient Coins")
    user.coins -= badge.cost
    user.badges.append(badge)
    try:
        db.commit()
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Already Owned")

    update_progress.delay(user.id, Events.badge_purchased)
    return


@router.get("/{u_id}",
            response_model=Users)
def get_me(
        u_id: int,
        db: Session = Depends(get_db)
):
    user = db.scalars(select(User).where(User.id == u_id)).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unknown User")
    return user
