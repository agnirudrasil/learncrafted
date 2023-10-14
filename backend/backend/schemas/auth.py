from pydantic import BaseModel, constr, EmailStr


class RegisterUser(BaseModel):
    name: constr(
        min_length=3,
        max_length=50,
        strip_whitespace=True,
    )
    password: constr(
        min_length=6,
        max_length=50
    )
    email: EmailStr


class LoginUser(BaseModel):
    email: EmailStr
    password: str
