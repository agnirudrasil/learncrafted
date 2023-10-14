from typing import Generator

from fastapi import Depends, HTTPException, Cookie
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette import status

from backend.core import security
from backend.core.settings import settings
from backend.db.session import SessionLocal
from backend.models.user import User
from backend.schemas.token import TokenPayload

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
        jid: str = Cookie(...),
        db: Session = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(
            jid,
            settings.SECRET_KEY,
            algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unknown user.",
        )

    user = db.scalars(select(User).where(User.id == int(token_data.sub))).first()

    if not user:
        raise HTTPException(status_code=401, detail="Unknown user.")

    return user
