from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from src.models.users.users import UserModel
from src.services.users.auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    create_user,
)

auth_router = APIRouter()


@auth_router.post(
    "/login",
    name="Auth: Token",
    status_code=status.HTTP_200_OK,
)
async def login_for_access_token(
    response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> UserModel:
    """
    Endpoint to obtain an access token for authentication.

    Parameters
    ----------
    *form_data* : Annotated[OAuth2PasswordRequestForm, Depends()] \\
        - OAuth2 password request form containing username and password.

    Returns
    -------
   *Token* \\
        - Token object containing the access token and token type (status code 200).

    Raises
    ------
    *HTTPException* \\
        - If the provided username or password is incorrect.
    """
    # Authenticate user
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)

    # Set the access token as a cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
    )

    return UserModel(**user.model_dump())


@auth_router.post(
    "/register",
    name="Auth: Register",
    status_code=status.HTTP_201_CREATED,
)
async def register_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response
) -> UserModel:
    """
    Endpoint to register a new user.

    Parameters
    ----------
    *user_data* : UserRegistrationModel: \\
        User registration data containing username and password.

    Returns
    -------
    *Token* \\
        Token object containing the access token and token type (status code 201).

    Raises
    ------
    *HTTPException* \\
        If the user already exists (status code 400).
    """
    # Create a new user
    new_user = create_user(form_data.username, form_data.password)
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": new_user.username}, expires_delta=access_token_expires)

    # Set the access token as a cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
    )

    return UserModel(**new_user.model_dump())


@auth_router.post(
    "/logout",
    name="Auth: Logout",
    status_code=status.HTTP_200_OK,
)
async def logout(response: Response):
    """
    Endpoint to remove the access token cookie.

    Parameters
    ----------
    *response* : Response \\
        - The response object.

    Returns
    -------
    *None* \\
        - No content (status code 200).
    """
    # Remove the access token cookie
    response.delete_cookie(key="access_token")

    return None