from pydantic import BaseModel


class TokenPayload(BaseModel):
    sub: str
    iat: int
    exp: int
