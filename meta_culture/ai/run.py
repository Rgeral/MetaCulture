# -*- coding: utf-8 -*-
from config import config
from web import creat_app
import logging
import traceback

app = creat_app()

if __name__ == "__main__":

    try:
        logging.debug("service started")
        app.run(host=config["HOST"], port=config["PORT"])
    except Exception as e:
        error_msg = f"An error occurred: {e}\n"
        tb_str = traceback.format_exception(
            etype=type(e), value=e, tb=e.__traceback__)
        tb_msg = ''.join(tb_str)
        logging.error(f"{error_msg}\n{tb_msg}")
