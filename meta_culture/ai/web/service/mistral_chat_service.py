import asyncio
from loguru import logger
from chat_mistral import mistral


class ChatMistralService:
    def __init__(self):
        pass

    def chat_mistral(self, data: dict) -> dict:
        """Chat with Mistral"""
        logger.info(f"Chat with Mistral: {data['message']}")
        answers = asyncio.run(mistral.generate_answers(data["message"]))
        return answers




