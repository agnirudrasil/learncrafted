from fastapi import FastAPI

from backend.api.v1 import router

app = FastAPI()

app.include_router(router)
