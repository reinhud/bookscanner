from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Allow requests to the backend from these origins
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://172.104.241.247:3000",
    "http://172.104.241.247:8000"
]


def add_cors_middleware(app: FastAPI) -> None:
    """Add middleware to FastAPI app.

    Parameters
    ----------
    app : FastAPI \\
        - The FastAPI app instance.

    Returns
    -------
    None
    """
    # Add middleware here
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,  # Allow cookies
        expose_headers="set-cookie",  # Expose cookies to the frontend
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )
