from pydantic import BaseModel


class BookModel(BaseModel):
    title: str | None = None
    authors: list[str] | None = None
    isbn13: str | None = None
    isbn10: str | None = None
    pageCount: int | str | None = None
    publishedDate: str | None = None
    categories: list[str] | str | None = None
    averageRating: str | int | float | None = None
    image_url: str | None = None
    description: str | None = None
    src: str | None = None
