"""Bundling of endpoint routers.

Import and add all endpoint routers here.
"""
from fastapi import APIRouter

from src.api.routes.auth import auth_router
from src.api.routes.books import book_router
from src.api.routes.users import user_router

app_router = APIRouter()

app_router.include_router(auth_router, prefix="", tags=["auth"])
app_router.include_router(user_router, prefix="", tags=["users"])
app_router.include_router(book_router, prefix="", tags=["books"])
