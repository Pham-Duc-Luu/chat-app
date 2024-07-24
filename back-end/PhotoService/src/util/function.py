# utils.py
import os
from typing import List, TypeVar, Dict, Any

T = TypeVar("T")
X = TypeVar("X", bound=str)


class Util:

    @staticmethod
    def get_env_variables(keys: List[str]) -> Dict[str, str]:
        missing_keys = [key for key in keys if key not in os.environ]
        if missing_keys:
            raise EnvironmentError(
                f"Missing environment variables: {', '.join(missing_keys)}"
            )
        return {key: os.getenv(key) for key in keys}


util = Util()
