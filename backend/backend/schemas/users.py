from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, BeforeValidator, EmailStr
from pydantic.v1.validators import str_validator


class Users(BaseModel):
    id: Annotated[str, BeforeValidator(str_validator)] = ""
    name: str
    email: EmailStr
    bio: Optional[str]
    avatar: Optional[str]
    user_type: int
    level: int
    coins: int
    xp: int

    model_config = ConfigDict(from_attributes=True)
