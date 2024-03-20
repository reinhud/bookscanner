from typing import List, Optional

from pydantic import BaseModel


class OpenLibraryBookInfo(BaseModel):
    title: str
    author_alternative_name: List[str]
    author_facet: List[str]
    lcc_sort: str
    ia: List[str]
    author_key: List[str]
    seed: List[str]
    isbn: List[str]
    has_fulltext: Optional[bool]
    edition_count: int
    edition_key: List[str]
    cover_i: int
    publish_year: List[int]
    publish_date: List[str]
    publisher: List[str]
    language: List[str]
    last_modified_i: int
    first_publish_year: Optional[int]
    author_name: List[str]
    contributor: Optional[List[str]]
    ia_loaded_id: List[str]
    ia_box_id: List[str]
    subject: List[str]
    place: List[str]
    time: List[str]
    person: List[str]
    ia_loaded_id: List[str]
    ia_box_id: List[str]
    ratings_average: float
    ratings_sortable: float
    ratings_count: int
    ratings_count_1: int
    ratings_count_2: int
    ratings_count_3: int
    ratings_count_4: int
    ratings_count_5: int
    readinglog_count: int
    want_to_read_count: int
    currently_reading_count: int
    already_read_count: int
    publisher_facet: List[str]
    person_key: List[str]
    place_key: List[str]
    time_facet: List[str]
    person_facet: List[str]
    subject_facet: List[str]
    _version_: int
    place_facet: List[str]
    lcc_sort: str
    author_facet: List[str]
    subject_key: List[str]
    time_key: List[str]
    ddc_sort: str


class OpenLibraryAPIResponse(BaseModel):
    books: List[OpenLibraryBookInfo]
