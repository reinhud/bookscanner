from src.config.tags_metadata import tags_metadata

description = """
Bookscanner📚 API helps you find books easily!


Welcome to the Bookscanner API, your go-to solution for easily finding books.
This backend powers the Bookscanner app, offering a range of endpoints for user management and book search.
Utilizing APIs from [Google Books](https://books.google.de/) and [Open Library](https://openlibrary.org/),
it delivers comprehensive book search functionality. [Firebase](https://firebase.google.com/) serves as
the lightweight database, ensuring seamless data management. 🚀


## Authentication
Authentication is handled via OAuth2 and [JWT Tokens](https://jwt.io/) access tokens. .
You can use the `/login` endpoint to get a token and use it to access the other endpoints.
The token expires after some time (currently 30 min), so you will need to login again to get a new token.
The registration endpoint also returns a token.


## Users

You will be able to:

* **Get the current user**.


## Search

You will be able to:

* **Search by name**: Search for books by name.
* **Search by raw**: Search for books by raw.
* **Search by image**: Search for books by image. (_not implemented_).
"""


fastapi_settings = {
    "title": "Bookscanner Backend",
    "version": "0.1.0",
    "description": description,
    "openapi_tags": tags_metadata,
}
