#!/usr/bin/python3
# -*- coding: utf-8 -*-

from fastapi import FastAPI
import uvicorn
import os

from src.api.routes.router import app_router
from src.config.fastapi_settings import fastapi_settings
from src.config.middleware import add_cors_middleware
from src.config.logger import logger


def get_app() -> FastAPI:
    """Instanciating and setting up FastAPI application."""
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
    uvicorn.run(
        "main:app",
        #host="0.0.0.0",
        port=8000,
        log_level="info"
    )
