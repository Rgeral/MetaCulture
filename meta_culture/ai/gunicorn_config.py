import multiprocessing

from config import config as gunicorn_config

workers = gunicorn_config["NUM_WORKERS"]
bind = gunicorn_config["BIND"]
threads = multiprocessing.cpu_count() * 5
loglevel = gunicorn_config["LOG_LEVEL"]
timeout = gunicorn_config["TIMEOUT"]
graceful_timeout = gunicorn_config["GRACEFUL_TIMEOUT"]
limit_request_line = gunicorn_config["LIMIT_REQUEST_LINE"]
limit_request_fields = gunicorn_config["LIMIT_REQUEST_FIELDS"]
limit_request_fields_size = gunicorn_config["LIMIT_REQUEST_FIELDS_SIZE"]
worker_class = gunicorn_config["WORKER_CLASS"]
