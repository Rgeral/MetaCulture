from flask import Blueprint

from web.public_message import error

error_controller = Blueprint('error_controller', __name__)


@error_controller.app_errorhandler(400)
def bad_request(e):
    return error(400, "[AI] Parameter error!"), 400


@error_controller.app_errorhandler(401)
def not_permissions(e):
    return error(
        401, "[AI] Apikey is wrong or you don't have permissions."
    ), 401


@error_controller.app_errorhandler(403)
def access_denied(e):
    return error(403, "[AI] Access denied!"), 403


@error_controller.app_errorhandler(404)
def not_found(e):
    return error(404, "[AI] Resource not found!"), 404


@error_controller.app_errorhandler(422)
def not_found(e):
    return error(422, "[AI] Empty Params not Acceptable!"), 422


@error_controller.app_errorhandler(500)
def internal_error(e):
    return error(500, "[AI] Internal error!"), 500
