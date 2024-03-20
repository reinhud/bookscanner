#!/usr/bin/python3
# -*- coding: utf-8 -*-

from fastapi import FastAPI

from src.api.routes.router import app_router
from src.config.fastapi_settings import fastapi_settings
from src.config.middleware import add_cors_middleware


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
