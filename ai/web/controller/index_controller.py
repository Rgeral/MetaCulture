from flask import Blueprint

from web.public_message import result

bp = Blueprint("index_controller", __name__)


@bp.route("/", methods=["GET"])
def index():
    return result("This is fred forest....")
