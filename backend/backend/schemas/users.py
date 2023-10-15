from typing import Annotated, Optional, List

from pydantic import BaseModel, ConfigDict, BeforeValidator, EmailStr
from pydantic.v1.validators import str_validator


class UserAchievement(BaseModel):
    id: Annotated[str, BeforeValidator(str_validator)] = ""
    name: str
    colour: str

    model_config = ConfigDict(from_attributes=True)


class UserBadge(BaseModel):
    id: Annotated[str, BeforeValidator(str_validator)] = ""
    name: str
    colour: str

    model_config = ConfigDict(from_attributes=True)


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
    badges: List[UserBadge]
    achievements: List[UserAchievement]

    model_config = ConfigDict(from_attributes=True)
