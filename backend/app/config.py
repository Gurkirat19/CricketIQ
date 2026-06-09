from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg2://cricketiq:cricketiqpass@db:5432/cricketiq"
    CRICKETIQ_PROVIDER: str = "cricapi"
    CRICAPI_KEY: str | None = None
    SPORTMONKS_API_TOKEN: str | None = None
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:4173"
    EMBEDDINGS_DIR: str = "/data/embeddings"
    CHROMA_DB_DIR: str = "/data/chroma"
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
