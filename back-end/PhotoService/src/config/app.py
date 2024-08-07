import os
from typing import List, Union
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

ENV_VARIABLES = ["", ""]


class AppConfig:
    APP_BASE_URL: str 
    ENV: str
    APP_PORT: str
    SERVER_KEY: str

    def __init__(self) -> None:
        self.APP_BASE_URL 

    def a(self):
        print(self.APP_BASE_URL)


appConfig = AppConfig()
print(appConfig.__dict__)
