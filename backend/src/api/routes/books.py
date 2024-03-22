import logging
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status

from src.models.books.books import BookModel
from src.models.users.users import UserModel
from src.services.books.get_books_from_apis import get_books_by_name
from src.services.users.auth import get_current_user

book_router = APIRouter()

logger = logging.getLogger(__name__)


@book_router.get(
    "/search/name",
    name="Books: Search by name",
    status_code=status.HTTP_200_OK,
    response_model=List[BookModel] | None,
)
async def search_by_name_route(
    query: str,
    current_user: Annotated[UserModel, Depends(get_current_user)],
) -> List[BookModel]:
    """Endpoint for searching books by name.

    Parameters
    ----------
    *query* : str \\
        - The search query. \\
    *current_user* : Annotated[UserModel, Depends(get_current_active_user)] \\
        - Current user data that is received from the get_current_active_user function automatically.

    Returns
    -------
    *List[BookModel* \\
        - Book data if found (status code 200).
    """
    books = await get_books_by_name(query, current_user.username)

    if not books:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No books found with the provided query.",
        )

    return books
