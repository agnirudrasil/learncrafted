from fastapi import APIRouter

from backend.api.v1.endpoints import auth, users, events, badges

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(events.router, prefix="/events", tags=["events"])
router.include_router(badges.router, prefix="/badges", tags=["badges"])
