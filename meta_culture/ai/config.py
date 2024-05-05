import os

from dotenv import load_dotenv

load_dotenv()

root_path = os.path.dirname(os.path.abspath(__file__))

config = {
    "DB_HOST": os.getenv("DB_HOST"),
    "DB_PORT": os.getenv("DB_PORT"),
    "DB_NAME": os.getenv("DB_NAME"),
    "DB_USERNAME": os.getenv("DB_USERNAME"),
    "DB_PASSWORD": os.getenv("DB_PASSWORD"),
    "HOST": os.getenv("HOST"),
    "PORT": os.getenv("PORT"),
    "MISTRAL_API_KEY": os.getenv("MISTRAL_API_KEY"),
}

"""
gunicorn config
"""
config["NUM_WORKERS"] = 1
config["BIND"] = "{}:{}".format(config["HOST"], config["PORT"])
config["LOG_LEVEL"] = "info"
config["TIMEOUT"] = 6000
config["GRACEFUL_TIMEOUT"] = 30
config["LIMIT_REQUEST_LINE"] = 8190
config["LIMIT_REQUEST_FIELDS"] = 200
config["LIMIT_REQUEST_FIELDS_SIZE"] = 8190
config["WORKER_CLASS"] = "gthread"

