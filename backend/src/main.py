#!/usr/bin/python3

import os

import uvicorn
from fastapi import FastAPI

from src.api.routes.router import app_router
from src.config.fastapi_settings import fastapi_settings
from src.config.logger import logger
from src.config.middleware import add_cors_middleware


def get_app() -> FastAPI:
    """Instantiating and setting up FastAPI application."""
    app = FastAPI(**fastapi_settings)

    app.include_router(app_router)

    add_cors_middleware(app)

    return app


app = get_app()


# ===== App Info Endpoints ===== #
@app.get("/")
async def root():
    return {"message": "OK"}


if __name__ == "__main__":
    logger.info("Starting the application")
    uvicorn.run("main:app", host=os.getenv("BACKEND_IP"), port=int(os.getenv("BACKEND_IP")), log_level="info")
