from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status

from src.api.dependencies.firebase import firebase_get
from src.config.logger import logger
from src.mocks.mock_recommendations import mock_recommendations
from src.models.books.books import BookModel
from src.models.users.users import UserModel
from src.services.users.auth import get_current_user

user_router = APIRouter()


@user_router.get("/users/me/", name="Users: Me", status_code=status.HTTP_200_OK, response_model=UserModel)
async def read_users_me(current_user: Annotated[UserModel, Depends(get_current_user)]):
    """Get the current user.

    Parameters
    ----------
    *current_user* : Annotated[UserModel, Depends(get_current_active_user)] \\
        - Current user data that is received from the get_current_active_user function automatically.

    Returns
    -------
    *UserModel* \\
        - Current user data (status code 200).
    """
    return current_user


@user_router.get(
    "/users/history",
    name="Users: Search History",
    status_code=status.HTTP_200_OK,
)
async def get_search_history(
    current_user: UserModel = Depends(get_current_user),
) -> List[BookModel]:
    """Get the search history for the current user. This will include the most relevant book from
    the individual search.

    Parameters
    ----------
    *current_user* : UserModel \\
        - Current user data.

    Returns
    -------
    *List[BookModel]* \\
        - List of search history entries for the current user.
    """
    logger.info(f"Retrieving search history for user: {current_user.username}")

    # Retrieve user's search history from Firebase
    search_history = firebase_get("users", current_user.username).get("searchHistory")

    relevant_books = []
    for search in search_history:
        # Get the most relevant book from the search results
        try:
            # Get the most relevant book from the search results
            most_relevant_book = search.get("searchResults")[0]

            # Validate and append the most relevant book to the list
            relevant_books.append(BookModel(**most_relevant_book))

        except Exception as e:
            logger.error(f"Failed to retrieve most relevant book with error: {e}")

    if relevant_books:
        return relevant_books[::-1]
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No search history found for the current user.",
        )


@user_router.get(
    "/users/recommendations",
    name="Users: Recommendations",
    status_code=status.HTTP_200_OK,
)
async def get_recommendations(
    current_user: UserModel = Depends(get_current_user),
) -> List[BookModel]:
    """Get book recommendations for the current user.

    Parameters
    ----------
    *current_user* : UserModel \\
        - Current user data.

    Returns
    -------
    *List[BookModel]* \\
        - List of recommended books for the current user.
    """
    logger.info(f"Retrieving book recommendations for user: {current_user.username}")

    # Retrieve user's recommendations from Firebase
    recommended_books = mock_recommendations

    if recommended_books:
        return recommended_books
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No recommendations found for the current user.",
        )
