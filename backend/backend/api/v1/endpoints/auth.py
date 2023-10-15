import sqlalchemy.exc
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette import status

from backend.api.deps import get_db
from backend.core.security import get_password_hash, verify_password, login_user
from backend.core.snowflake import snowflake_id
from backend.models.user import User
from backend.schemas.auth import RegisterUser, LoginUser

router = APIRouter()


@router.post("/register")
def register(
        data: RegisterUser,
        response: Response,
        db: Session = Depends(get_db)
):
    user = User(
        id=next(snowflake_id),
        name=data.name,
        email=data.email,
        password=get_password_hash(data.password),
        user_type=0
    )
    db.add(user)

    try:
        db.commit()
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")

    login_user(user.id, response)
    return {"message": "Register successful"}


@router.post("/login")
def login(
        data: LoginUser,
        response: Response,
        db: Session = Depends(get_db)
):
    user = db.scalars(select(User).where(User.email == data.email)).first()

    if not user:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    login_user(user.id, response)
    return {"message": "Login successful"}


@router.post("/logout")
def logout(
        response: Response
):
    response.delete_cookie("jid")
    return {"message": "Logout successful"}
