import os
from typing import List

import requests

from src.config.logger import logger
from src.models.books.books import BookModel

# Open Library API URL for searching books
OPEN_LIBRARY_SEARCH_URL = os.getenv("OPEN_LIBRARY_SEARCH_URL")


def extract_isbn(identifiers: List[dict], isbn_length: int) -> str | None:
    """Extracts the ISBN from the list of identifiers based on the specified
    ISBN length.

    Parameters
    ----------
    identifiers : List[dict]
        List of identifier dictionaries.
    isbn_length : int
        Length of the ISBN to extract (e.g., 10 or 13).

    Returns
    -------
    str | None
        Extracted ISBN string if found, otherwise None.
    """
    for identifier in identifiers:
        try:
            isbn = identifier["identifier"]
            if len(isbn) == isbn_length:
                return isbn
        except (KeyError, TypeError):
            pass
    return None


def search_open_library(query: str, max_books_to_return: int = 3) -> List[BookModel] | None:
    """Search the Open Library API for books using the provided query and
    return up to the specified number of books found.

    Parameters
    ----------
    query : str
        The search query.
    max_books_to_return : int, optional
        The maximum number of books to return. Default is 3.

    Returns
    -------
    List[BookModel] | None
        List of BookModel instances if books are found, None otherwise.

    Raises
    ------
    requests.RequestException
        If an error occurs while querying the Open Library API.
    """
    try:
        logger.info(f"Querying Open Library for: {query}")

        # Make a GET request to the Open Library API
        response = requests.get(OPEN_LIBRARY_SEARCH_URL, params={"q": query})

        # Raises a HTTPError if the response status code is 4XX/5XX
        response.raise_for_status()

        # Parsing the JSON response
        response_data = response.json()

        # Extract book information and validate it with the BookModel
        books = []
        for doc in response_data["docs"][:max_books_to_return]:
            isbn13 = extract_isbn(doc.get("isbn", []), isbn_length=13)
            isbn10 = extract_isbn(doc.get("isbn", []), isbn_length=10)

            book = BookModel(
                title=doc.get("title"),
                authors=doc.get("author_name", []),
                isbn13=isbn13,
                isbn10=isbn10,
                publishedDate=doc.get("publish_date", [None])[0],  # Only the first date is used
                categories=doc.get("subject", []),
                averageRating=doc.get("ratings_average"),
                image_url=f"https://covers.openlibrary.org/b/id/{doc.get('cover_i', '')}-L.jpg",
                src="open_library",
            )
            books.append(book)

        return books

    except requests.RequestException as e:
        logger.error(f"Error querying Open Library: {e}")
        return None
