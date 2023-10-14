from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.api.v1 import router
from backend.core.settings import settings

app = FastAPI()

app.include_router(router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin)
                   for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
