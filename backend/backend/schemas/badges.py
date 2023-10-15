from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict
from pydantic.v1.validators import str_validator


class Badges(BaseModel):
    id: Annotated[str, BeforeValidator(str_validator)]
    name: str
    description: str
    cost: int
    colour: str

    model_config = ConfigDict(from_attributes=True)

