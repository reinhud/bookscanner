from typing import List, Optional

from pydantic import BaseModel


class IndustryIdentifier(BaseModel):
    type: str
    identifier: str


class ReadingModes(BaseModel):
    text: bool
    image: bool


class PanelizationSummary(BaseModel):
    containsEpubBubbles: bool
    containsImageBubbles: bool


class ImageLinks(BaseModel):
    smallThumbnail: str
    thumbnail: str


class VolumeInfo(BaseModel):
    title: str
    subtitle: Optional[str]
    authors: List[str]
    publisher: Optional[str]
    publishedDate: Optional[str]
    industryIdentifiers: List[IndustryIdentifier]
    readingModes: ReadingModes
    pageCount: int
    printType: str
    averageRating: Optional[float]
    ratingsCount: Optional[int]
    maturityRating: str
    allowAnonLogging: bool
    contentVersion: str
    panelizationSummary: PanelizationSummary
    imageLinks: ImageLinks
    language: str
    previewLink: str
    infoLink: str
    canonicalVolumeLink: str


class SaleInfo(BaseModel):
    country: str
    saleability: str
    isEbook: bool
    listPrice: Optional[dict]
    retailPrice: Optional[dict]
    buyLink: Optional[str]
    offers: Optional[List[dict]]


class Epub(BaseModel):
    isAvailable: bool


class Pdf(BaseModel):
    isAvailable: bool
    acsTokenLink: Optional[str]


class AccessInfo(BaseModel):
    country: str
    viewability: str
    embeddable: bool
    publicDomain: bool
    textToSpeechPermission: str
    epub: Epub
    pdf: Pdf
    webReaderLink: str
    accessViewStatus: str
    quoteSharingAllowed: bool


class SearchInfo(BaseModel):
    textSnippet: str


class Item(BaseModel):
    kind: str
    id: str
    etag: str
    selfLink: str
    volumeInfo: VolumeInfo
    saleInfo: SaleInfo
    accessInfo: AccessInfo
    searchInfo: Optional[SearchInfo]


class GoogleBooksBookInfo(BaseModel):
    kind: str
    totalItems: int
    items: List[Item]


class GoogleBooksApiResponse(BaseModel):
    books: List[GoogleBooksBookInfo]
