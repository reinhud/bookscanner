import os
from datetime import datetime, timedelta, timezone
from typing import Annotated, Dict, Optional

from fastapi import Depends, HTTPException, Request, status
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from jose import JWTError, jwt
from werkzeug.security import check_password_hash, generate_password_hash

from src.api.dependencies.firebase import firebase_get, firebase_set
from src.config.logger import logger
from src.models.users.users import Token, TokenData, UserInDBModel, UserModel


class OAuth2PasswordBearerWithCookie(OAuth2):
    """Class for validating and retrieving access tokens from HTTP-only cookies.

    Parameters
    ----------
    tokenUrl : str
        The URL where the client should send the username and password for verification.
    scheme_name : Optional[str], optional
        The name of the scheme.
    scopes : Optional[Dict[str, str]], optional
        Optional scopes.
    auto_error : bool, optional
        If True, automatically raise HTTPException on error.

    Returns
    -------
    None
    """

    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[Dict[str, str]] = None,
        auto_error: bool = True,
    ) -> None:
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Token:
        """Validate and retrieve the access token from the HTTP-only cookie.

        Parameters
        ----------
        request : Request
            The incoming request.

        Returns
        -------
        Optional[str]
            The access token if present in the cookie, else None.

        Raises
        ------
        HTTPException
            If not authenticated.
        """
        # Accept access token from HTTP-only Cookie
        authorization: str = request.cookies.get("access_token")

        # Get the scheme and parameter from the authorization header
        scheme, param = get_authorization_scheme_param(authorization)
        # Check if the scheme is "Bearer"
        if not authorization or scheme.lower() != "bearer":
            # If the scheme is not "Bearer", raise an exception
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="login")

# Secret key used for encoding and decoding JWT tokens
SECRET_KEY = os.getenv("AUTH_JWT_SECRET")
# Algorithm used for encoding and decoding JWT tokens
ALGORITHM = os.getenv("AUTH_JWT_ALGORITHM")
# Access token expiration time in minutes
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("AUTH_ACCESS_TOKEN_EXPIRE_MINUTES"))


def verify_password(hashed_password: str, plain_password: str) -> bool:
    """Verify if a plain text password matches the hashed password.

    Parameters
    ----------
    hashed_password : str
        Hashed password stored in the database.
    plain_password : str
        Plain text password entered by the user.

    Returns
    -------
    bool
        True if passwords match, False otherwise.
    """
    return check_password_hash(hashed_password, plain_password)


def get_password_hash(plain_password: str) -> str:
    """Generate a hashed password from a plain text password.

    Parameters
    ----------
    plain_password : str
        Plain text password entered by the user.

    Returns
    -------
    str
        Hashed password.
    """
    return generate_password_hash(plain_password)


def get_user(username: str) -> UserInDBModel | None:
    """Retrieve user data from the database.

    Parameters
    ----------
    username : str
        Username of the user.

    Returns
    -------
    UserInDBModel | None
        User data if found, None otherwise.
    """
    # Query database for user data using the provided username
    user_db = firebase_get("users", username)

    # If user data is found, create a UserInDBModel instance and return it
    if user_db:
        return UserInDBModel(**user_db)
    else:
        return None


def authenticate_user(username: str, password: str) -> UserInDBModel | bool:
    """Authenticate a user with the provided username and password.

    Parameters
    ----------
    username : str
        Username of the user.
    password : str
        Password entered by the user.

    Returns
    -------
    UserInDBModel | bool
        User data if authenticated, False otherwise.
    """
    logger.info(f"User login attempt: '{username}'")

    # Retrieve user data from the database based on the provided username
    user = get_user(username)

    # If user data is not found, log an error and return False
    if not user:
        return False

    # Verify the password provided against the hashed password stored in the database
    if not verify_password(user.password, password):
        logger.error(f"Invalid password for user: '{username}'")
        return False

    # If both username and password are valid, log the successful authentication and return the user data
    logger.info(f"User authenticated: '{username}'")
    return user


def create_user(username: str, password: str) -> UserInDBModel | None:
    """Create a new user in the database.

    Parameters
    ----------
    new_user : UserModel
        User data containing username and password of new user.

    Returns
    -------
    UserInDBModel | None
        New user data model, or None if the username is already taken.
    """
    logger.info(f"User registration attempt: '{username}'")

    # Check if the username is already taken
    existing_user = get_user(username)
    if existing_user:
        logger.error(f"Username already taken: '{username}'")
        return None

    # Hash the password before storing it in the database
    hashed_password = get_password_hash(password)

    # Store the new user in the database
    new_user_data = UserInDBModel(username=username, password=hashed_password)
    firebase_set("users", username, new_user_data.model_dump())

    # Retrieve the new user from the database
    user = get_user(username)

    logger.info(f"Created new user: '{username}'")

    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create an access token with the provided data.

    Parameters
    ----------
    data : dict
        Data to be encoded in the access token.
    expires_delta : timedelta | None, optional
        Expiration time delta for the access token, by default None.

    Returns
    -------
    str
        Encoded access token.
    """
    # Make a copy of the data to avoid modifying the original dictionary
    to_encode = data.copy()

    # Calculate the expiration time for the token
    if expires_delta:
        # If an expiration delta is provided, calculate the token expiration time based on it
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # If no expiration delta is provided, set a default expiration time (15 minutes from now)
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    # Update the token data with the expiration time
    to_encode.update({"exp": expire})

    # Encode the token using the provided data, secret key, and algorithm
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    # Return the encoded access token
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserModel:
    """Retrieve the current user from the access token.

    Parameters
    ----------
    token : Annotated[str, Depends(oauth2_scheme)]
        Access token provided by the client.

    Returns
    -------
    UserModel
        Current user data.

    Raises
    ------
    HTTPException
        If credentials validation fails.
    """
    # Define an HTTPException instance to raise if credentials validation fails
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode the token and extract the username
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")

        # If the username is missing, raise an exception
        if username is None:
            logger.error("Invalid token: missing sub")
            raise credentials_exception

        # Create a TokenData instance containing the username
        token_data = TokenData(username=username)

    except JWTError:
        # If a JWTError occurs during decoding, raise an exception
        logger.error("Invalid token: JWTError")
        raise credentials_exception

    # Retrieve user data based on the extracted username
    user = get_user(username=token_data.username)

    # If the user is not found, raise an exception
    if user is None:
        logger.error(f"User not found: '{username}'")
        raise credentials_exception

    # Log the successful validation of the user
    logger.info(f"User validated: '{username}'")

    # Return the validated user data
    return user
