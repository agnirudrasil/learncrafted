from fastapi import APIRouter

from backend.api.v1.endpoints import auth, users

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
