from datetime import timedelta, datetime, timezone
from typing import Union, Any, Optional, Literal

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from starlette.responses import Response

from backend.core.settings import settings
from backend.schemas.token import TokenPayload

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
ALGORITHM = "HS256"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(
        subject: Union[str, Any],
        expires_delta: Optional[Union[timedelta, Literal["na"]]] = None,
) -> str:
    iat = datetime.now(tz=timezone.utc)
    if expires_delta == "na":
        expire = None
    elif expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"sub": str(subject), "iat": iat}
    if expire is not None:
        to_encode["exp"] = expire
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=ALGORITHM
    )
    return encoded_jwt


def verify_jwt(token: str) -> TokenPayload:
    payload = jwt.decode(
        token, settings.SECRET_KEY, algorithms=[ALGORITHM]
    )
    return TokenPayload(**payload)


def login_user(user_id: int, response: Response) -> str:
    token = create_access_token(
        subject=str(user_id),
    )

    response.set_cookie(
        "jid",
        token,
        httponly=True,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return token
