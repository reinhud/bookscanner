import os

# ===== Set up object detection model ===== #
import sys
from io import BytesIO
from typing import List

import numpy as np
import torch
from cv2 import COLOR_BGR2RGB, cvtColor
from easyocr import Reader
from fastapi import UploadFile
from PIL import Image

from src.config.logger import logger

logger.info(f"{os.getcwd()}")
logger.info(f"{sys.path}")
logger.info("Setting up object detection model.")
# Change the current working directory
os.chdir("/workspace/backend")

MODEL_PATH = "/workspace/backend/src/services/books/yolo.pt"

# Load object detection model
# YOLOv5 = torch.load(MODEL_PATH)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Set model to evaluation mode
model.eval()

logger.info("Object detection model loaded.")


# ===== Image recognition functions ===== #
async def convert_upload_to_numpy(image: UploadFile) -> np.ndarray:
    """Converts an uploaded image file to a NumPy array.

    Parameters
    ----------
    *image* : UploadFile \\
        - Uploaded image file.

    Returns
    -------
    *np.ndarray* \\
        - NumPy array representing the image.
    """
    logger.info("Converting uploaded image to NumPy array.")

    try:
        # Read image file
        contents = await image.read()
        image_data = BytesIO(contents)

        # Open image with PIL
        image_pil = Image.open(image_data)

        # Convert PIL image to NumPy array
        image_np = np.array(image_pil)

        return image_np

    except Exception as e:
        logger.error(f"Error converting uploaded image to NumPy array: {e}")
        raise e


def extract_top_confident_per_class(classes: torch.Tensor, predictions: torch.Tensor) -> List[float]:
    """
    Extracts the top confident prediction for each class.

    Parameters
    ----------
    classes : torch.Tensor
        Tensor containing unique classes.
    predictions : torch.Tensor
        Object detection predictions.

    Returns
    -------
    list
        List of top confident predictions for each class.
    """
    logger.info("Extracting top confident prediction for each class.")

    try:
        max_confidence_per_class = []
        for id in classes:
            # Filter predictions by class
            cond = predictions.xyxy[0][:, -1] == id
            relevant_preds = predictions.xyxy[0][cond]

            # Find max confidence prediction for the class
            max_value, max_index = torch.max(relevant_preds[:, -2], 0)
            max_confidence_per_class += [relevant_preds[max_index]]

        return max_confidence_per_class

    except Exception as e:
        logger.error(f"Error extracting top confident prediction for each class: {e}")
        raise e


def crop_and_ocr(img: np.ndarray, bboxes: list) -> List[str]:
    """
    Open an image using OpenCV, crop according to bounding boxes, display, and OCR each crop.

    Parameters
    ----------
    img : numpy.ndarray
        Input image as a NumPy array.
    bboxes : list
        List of bounding boxes (x1, y1, x2, y2, confidence, class).

    Returns
    -------
    list
        OCR results for each crop.
    """
    logger.info("Cropping and performing OCR on the image.")

    # Convert BGR (OpenCV format) to RGB for display purposes
    img_rgb = cvtColor(img, COLOR_BGR2RGB)

    # Initialize EasyOCR reader
    reader = Reader(["en"])
    text_results = []

    try:
        # Loop through bounding boxes and perform OCR
        for i, box in enumerate(bboxes):
            box = [int(coord) for coord in box]
            # Skip if class == 1 (class=book)
            if box[-1] == 1:
                continue
            crop = img_rgb[box[1] : box[3], box[0] : box[2]]

            # Perform OCR on the cropped image (crop is already a NumPy array)
            ocr_result = reader.readtext(crop, detail=0)
            text_results.append(ocr_result)

        return text_results

    except Exception as e:
        logger.error(f"Error performing OCR on the cropped image: {e}")
        raise e


def extract_text_from_image(image: np.ndarray) -> str | None:
    """
    Extracts text from an image using an object detection model and OCR.

    Parameters
    ----------
    image : numpy.ndarray
        Input image as a NumPy array.
    model : torch.nn.Module
        Object detection model.

    Returns
    -------
    str
        Extracted text from the image.
    """
    # Perform object detection
    """pred = YOLOv5(image)

    # Get unique classes from predictions
    pred_classes = pred.xyxy[0][:, -1].unique()

    # Extract most confident prediction per class
    filtered_pred = extract_top_confident_per_class(pred_classes, pred)

    # Crop image and perform OCR
    extracted_text = crop_and_ocr(image, filtered_pred)

    # Flatten extracted text
    flattened_text = ' '.join([item for sublist in extracted_text for item in sublist])"""

    return None
