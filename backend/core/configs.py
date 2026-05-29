from pydantic_settings import BaseSettings
from typing_extensions import final


class Settings(BaseSettings):
    host: str = "127.0.0.1"
    port: int = 8000
    debug: bool = False

    @final
    class Config:
        env_file = ".env"


settings = Settings()
