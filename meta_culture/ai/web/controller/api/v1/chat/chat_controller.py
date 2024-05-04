from functools import wraps
from flask import Blueprint, jsonify, request
from flask import json
from web.manager import chat_mistral_service
from web.public_message import error
from web.validator import chat_validator

bp = Blueprint("chat_controller", __name__)

"""
The parameter type and specification definition passed in by API.

@api {post} /chat-mistral
@apiVersion 1.0.0
@apiName mistral chatbot
@apiGroup chat
@apiDescription chat with mistral llm to answer users' questions

@apiParam {json} feature including show, showName, tmdbId, overview, mediaDate
@apiParamExample {json} Request-Example:
    {
      "message": "Who are you"
    }
@apiSuccess {json} Result-Example:
    {
        "response": "I'm Fred Forest, a French new media artist recognized for my contributions to the field of media art. I'm currently 93 years old."
    }
"""


@bp.route("/chat-mistral", methods=['POST'])
# @require_api_key
def chat_mistral_route():
    input_query = request.json
    result = chat_validator.chat_validator(input_query).valid
    if result:
        try:
            response = chat_mistral_service.chat_mistral(input_query)
            return jsonify(response=json.loads(json.dumps(response)))
        except IndexError as e:
            return jsonify(result=json.loads(json.dumps("parameters are not in the database.")))
    else:
        return error("400", "The parameters are not valid."), 400

