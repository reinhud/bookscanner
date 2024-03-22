import os
from typing import List

from firebase_admin import credentials, firestore, initialize_app

from src.config.logger import logger

# Initialize the app with a service account, granting admin privileges
FIREBASE_CREDS = {
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
    "universe_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN"),
}
cred = credentials.Certificate(FIREBASE_CREDS)
initialize_app(cred)


# Provide a Firestore instance to the rest of the application
def provide_db():
    db = firestore.client()
    return db


# ========== Firestore Functions ========== #
def firebase_get(collection: str, document: str) -> dict | None:
    """Retrieves a document from a Firestore collection.

    Parameters
    ----------
    collection : str
        The name of the collection.

        document : str
        The name of the document.

        Returns
        -------
        dict | None
        The document data if it exists, otherwise None.
    """
    try:
        # Get a document from a collection
        doc_ref = provide_db().collection(collection).document(document)
        doc = doc_ref.get()

        # Check if the document exists
        if doc.exists:
            logger.info(f"Retrieving document: '{document}' from collection: '{collection}'")
            return doc.to_dict()

        # If the document does not exist
        else:
            logger.warning(f"Failed to retrieve document: '{document}' from collection: '{collection}'")
            return None

    # If an error occurs
    except Exception as e:
        logger.error(f"Failed to retrieve document: '{document}' from collection: '{collection}'")
        logger.error(e)
        return None


def firebase_set(collection: str, document: str, data: dict | List) -> None:
    """Sets a document in a Firestore collection.

    Parameters
    ----------
    collection : str
        The name of the collection.

        document : str
        The name of the document.

        data : dict
        The data to be stored in the document.

        Returns
        -------
        None
    """
    try:
        logger.info(f"Setting document: '{document}' in collection: '{collection}'")
        provide_db().collection(collection).document(document).set(data)
    except Exception as e:
        logger.error(
            f"Failed to set document: '{document}' in collection: '{collection}' with data: '{data}'"
        )
        logger.error(e)


def firebase_update(collection: str, document: str, data: dict) -> None:
    """Updates a document in a Firestore collection.

    Parameters
    ----------
    collection : str
        The name of the collection.

        document : str
        The name of the document.

        data : dict
        The data to be updated in the document.

        Returns
        -------
        None
    """
    try:
        logger.info(f"Updating document: '{document}' in collection: '{collection}'")
        provide_db().collection(collection).document(document).update(data)
    except Exception as e:
        logger.error(
            f"Failed to update document: '{document}' in collection: '{collection}' with data: '{data}'"
        )
        logger.error(e)
