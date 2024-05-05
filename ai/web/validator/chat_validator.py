from validator import validate, ValidationResult, InstanceOf


def chat_validator(input_query: dict) -> ValidationResult:
    """
    Parameter validate
    :return parse:
    """
    rules = {
        "message": [InstanceOf(str)],
    }
    result = validate(rules, input_query)
    if result.valid:
        result = ValidationResult(valid=True, errors=None)
    else:
        result = ValidationResult(valid=False, errors="wrong format for mediaDate")
    return result

