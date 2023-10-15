from typing import Optional, Annotated

from pydantic import BaseModel, AwareDatetime, ConfigDict, BeforeValidator
from pydantic.v1.validators import str_validator

from backend.schemas import date_iso_format


class CreateEvent(BaseModel):
    name: str
    description: Optional[str] = None
    colour: str
    start: AwareDatetime
    end: Optional[AwareDatetime] = None
    repeat: Optional[bool] = False


class Events(CreateEvent):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[str, BeforeValidator(str_validator)]
    name: str
    description: Optional[str] = None
    colour: str
    start: Annotated[AwareDatetime, BeforeValidator(date_iso_format)]
    end: Annotated[Optional[AwareDatetime], BeforeValidator(date_iso_format)] = None
    repeat: Optional[bool] = False
