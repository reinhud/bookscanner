import os
from typing import List

import requests

from src.config.logger import logger
from src.models.books.books import BookModel

# Google Books API URL for searching volumes
GOOGLE_BOOKS_SEARCH_URL = os.getenv("GOOGLE_BOOKS_SEARCH_URL")
# API key for accessing Google Books API
GOOGLE_BOOKS_SEARCH_KEY = os.getenv("GOOGLE_BOOKS_SEARCH_KEY")


def extract_isbn(identifiers: List[dict], isbn_type: str) -> str | None:
    """Extracts the ISBN from the list of identifiers based on the specified
    ISBN type.

    Parameters
    ----------
    identifiers : List[dict]
        List of identifier dictionaries.
    isbn_type : str
        Type of ISBN to extract (e.g., "ISBN_13" or "ISBN_10").

    Returns
    -------
    str | None
        Extracted ISBN string if found, otherwise None.
    """
    for identifier in identifiers:
        if identifier.get("type") == isbn_type:
            return identifier.get("identifier")
    return None


def search_google_books(query: str, max_books_to_return: int = 3) -> List[BookModel] | None:
    """Search for books on Google Books API using the provided query and return
    up to the specified number of books found.

    Parameters
    ----------
    query : str
        The search query.
    max_books_to_return : int, optional
        The maximum number of books to return. Default is 3.

    Returns
    -------
    List[BookModel] | None
        A list of BookModel objects containing search results if successful, otherwise None.
    """
    try:
        logger.info(f"Searching Google Books for: {query}")

        # Sending a GET request to Google Books API with the query and API key as parameters
        response = requests.get(GOOGLE_BOOKS_SEARCH_URL, params={"q": query, "key": GOOGLE_BOOKS_SEARCH_KEY})

        # Raise an HTTPError if the response status code is not 2xx
        response.raise_for_status()

        # Parsing the JSON response
        response_data = response.json()

        # Extract books and validate them with the BookModel
        books = []
        for item in response_data.get("items", [])[:max_books_to_return]:
            # Book information are stored in the "volumeInfo" key of each item of the
            # "items" list of the response
            volume_info = item.get("volumeInfo", {})
            image_links = volume_info.get("imageLinks", {})
            industry_identifiers = volume_info.get("industryIdentifiers", [])

            isbn13 = extract_isbn(industry_identifiers, "ISBN_13")
            isbn10 = extract_isbn(industry_identifiers, "ISBN_10")

            book = BookModel(
                title=volume_info.get("title"),
                authors=volume_info.get("authors", []),
                isbn13=isbn13,
                isbn10=isbn10,
                publishedDate=volume_info.get("publishedDate"),
                description=volume_info.get("description"),
                pageCount=volume_info.get("pageCount"),
                averageRating=volume_info.get("averageRating"),
                image_url=image_links.get("thumbnail"),
                src="google_books",
            )
            books.append(book)

        return books

    except requests.RequestException as e:
        logger.error(f"Error querying Google Books: {e}")
        return None
