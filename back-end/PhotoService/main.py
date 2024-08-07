from typing import Union
from fastapi import FastAPI
from src.config.app import appConfig

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "welcome to Photo service!!!"}
