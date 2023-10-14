from fastapi import APIRouter, Depends

from backend.api.deps import get_current_user
from backend.models.user import User
from backend.schemas.users import Users

router = APIRouter()


@router.get("/@me",
            response_model=Users)
def get_me(
        user: User = Depends(get_current_user)
):
    return user
