from flask import jsonify


def result(message):
    return jsonify(result=message)


def error(code, message):
    return jsonify({"error": code, "errorMessage": message})
