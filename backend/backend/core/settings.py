from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="")
    SECRET_KEY: str = ''
    SQL_ALCHEMY_DATABASE_URI: PostgresDsn = 'postgresql://agnirudrasil@localhost:5432/learncrafted'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30  # 30 days
    API_V1_STR: str = '/api/v1'


settings = Settings()
