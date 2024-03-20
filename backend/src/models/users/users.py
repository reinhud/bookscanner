from datetime import datetime, timezone

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserModel(BaseModel):
    username: str


class UserRegistrationModel(UserModel):
    password: str


class UserInDBModel(BaseModel):
    username: str
    password: str
    createdAt: datetime = datetime.now(timezone.utc)
    searchHistory: list = []
