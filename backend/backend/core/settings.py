from pydantic import PostgresDsn
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SQL_ALCHEMY_DATABASE_URI: PostgresDsn = 'postgresql://agnirudrasil@localhost:5432/learncrafted'


settings = Settings()
