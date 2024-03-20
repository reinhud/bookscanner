from datetime import datetime, timezone
from typing import List

from google.cloud.firestore import ArrayUnion

from src.api.dependancies.firebase import firebase_get, firebase_set, firebase_update
from src.api.dependancies.google_books import search_google_books
from src.api.dependancies.open_library import search_open_library
from src.models.books.books import BookModel


async def get_books_by_name(query: str, username: str) -> List[BookModel] | None:
    """
    Get books from the Google Books and Open Library APIs as well as
    searching in the cache.

    Parameters
    ----------
    *query* : str
        - The search query.

    Returns
    -------
    *List[BookModel] | None*
        - Book data if found, None otherwise.
    """
    # Check Firestore for existing search results
    cached_books = firebase_get("book_searches", query)
    if cached_books:
        # Update user search history
        firebase_update("users", username, {"searchHistory": ArrayUnion([cached_books])})

        # Return cached search results
        books = [BookModel(**cached_book) for cached_book in cached_books["searchResults"]]

        return books

    books = []

    # Search Google Books API
    google_books = search_google_books(query)
    if google_books:
        books.extend(google_books)

    # Search Open Library API
    open_library_books = search_open_library(query)
    if open_library_books:
        books.extend(open_library_books)

    # If search results are found, update user search history and Firebase search results
    if books:
        # Update user search history
        new_search_entry = {
            "datetime": datetime.now(timezone.utc),
            "searchQuery": query,
            "searchResults": [book.model_dump() for book in books],
        }
        firebase_update("users", username, {"searchHistory": ArrayUnion([new_search_entry])})

        # Update Firebase with the new search results
        firebase_set("book_searches", query, new_search_entry)

    return None if not books else books
