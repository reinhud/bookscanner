import sys

from loguru import logger
from loguru._defaults import LOGURU_FORMAT


def setup_logging() -> None:
    """
    Set up logging configuration.
    """
    logger.remove()  # Remove any existing handlers
    logger.add(  # Add standard out handler with colored output
        sink=sys.stderr,  # stdout will be used
        colorize=True,  # Enable colored output
        format=LOGURU_FORMAT,  # Use Loguru's default log format
        level="DEBUG",  # Set the logging level
    )
    logger.add(  # Add file handler
        "logs/app.log",  # Log file path
        rotation="100 MB",  # Rotate log files after reaching 100 MB
        retention="7 days",  # Keep logs for 7 days
        encoding="utf-8",  # Set file encoding
        level="DEBUG",  # Set the logging level
        format=LOGURU_FORMAT,  # Use Loguru's default log format
    )


# Call the setup_logging function to configure logging when this module is imported
setup_logging()
