"""Wraps interactions with the LLM."""
from config import config
from enum import Enum
from typing import Any
import functools
import asyncio
from loguru import logger
from chat_mistral import llm_prompts
from predibase import PredibaseClient


PREDIBASE_API_KEY = config["PREDIBASE_API_KEY"]


class Model(Enum):
    """Model versions."""

    MISTRAL_1 = 1


_MODELS = {
    Model.MISTRAL_1: "mistral-7b-instruct-v0-2",
}

_MODELS_CACHE: dict[Model, Any] = {}

_PREDIBASE_CLIENT = PredibaseClient(token=PREDIBASE_API_KEY)


def _get_model(model: Model):
    if model not in _MODELS_CACHE:
        _MODELS_CACHE[model] = _PREDIBASE_CLIENT.LLM(
            f"pb://deployments/{_MODELS[model]}"
        )
    return _MODELS_CACHE[model]


async def _call_llm(  # pylint: disable=too-many-arguments
    model: Model,
    prompt_parts: str,
    temperature: float = 0.1,
    max_new_tokens: int = 1024,
    bypass_system_prompt: bool = False,
) -> Any:

    result = await run_in_current_event_loop(
        _get_model(model).prompt,
        prompt_parts,
        temperature,
        max_new_tokens,
        bypass_system_prompt,
    )
    return result.response


async def generate_answers(input_text) -> dict:
    parts = llm_prompts.CHAT_PROMPT_METACULTURE.format(input_text=input_text)
    result: str = await _call_llm(Model.MISTRAL_1, parts)
    logger.info(f"Answers Display: {result}")
    try:
        result = result
    # Regex pattern to match a simpler JSON structure
    except Exception as e:
        logger.error(f"Error in generate_info_to_display: {e}")
        result = None
    return result


def run_in_current_event_loop(fn, *args, **kwargs):
    """Turn a function into a coroutine in the current loop."""
    return asyncio.get_running_loop().run_in_executor(
        None, functools.partial(fn, *args, **kwargs)
    )
