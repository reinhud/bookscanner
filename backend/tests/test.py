import torch
import os
from src.config.logger import logger
# ===== Set up object detection model ===== #
import sys

MODEL_PATH = "/workspace/backend/src/services/books/yolo.pt"

model = torch.hub.load("ultralytics/yolov5", 'custom')


if __name__ == "__main__":
    logger.info(f"{os.getcwd()}")
    logger.info(f"{sys.path}")
    print(model)
    print("Hello, world!")