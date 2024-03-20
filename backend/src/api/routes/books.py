import logging
from typing import Annotated, List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from src.models.books.books import BookModel
from src.models.users.users import UserModel
'''from src.services.books.book_image_recognition import (
    convert_upload_to_numpy,
    extract_text_from_image,
)'''
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
    """
    Endpoint for searching books by name.

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


'''@book_router.post(
    "/search/image",
    name="Books: Search by image",
    status_code=status.HTTP_200_OK,
)
async def search_book_by_image_route(
    current_user: Annotated[UserModel, Depends(get_current_user)],
    image: UploadFile = File(...),  # Changed parameter type to UploadFile
) -> List[BookModel]:
    """
    Endpoint for searching books by image.

    Parameters
    ----------
    *current_user* : Annotated[UserModel, Depends(get_current_active_user)] \\
        - Current user data that is received from the get_current_active_user function automatically.

    *image* : UploadFile \\
        - Uploaded image file.

    Returns
    -------
    *List[BookModel] \\
        - Book data if found (status code 200).
    """
    # Convert image to NumPy array
    image_np = await convert_upload_to_numpy(image)

    # Try extracting text from the image
    try:
        extracted_text = extract_text_from_image(image_np)
    except Exception as e:
        logger.error(f"Error extracting text from image: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error extracting text from image",
        )

    if not extracted_text:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No text found in the image",
        )

    books = await get_books_by_name(extracted_text, current_user.username)

    if not books:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No books found with the provided query.",
        )

    return books'''
