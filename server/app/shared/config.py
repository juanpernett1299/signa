import os
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError


# Manually load the .env file into environment variables
load_dotenv()


class Settings(BaseModel):
    PROJECT_NAME: str = "Signa API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Backend API para la aplicación Signa"
    API_V1_STR: str = "/api/v1"
    
    # Supabase Configuration - Loaded from .env file
    SUPABASE_URL: str
    SUPABASE_KEY: str


try:
    # We now manually read from the environment and pass the values to Pydantic
    # for validation. If a variable is missing, os.getenv returns None, and
    # Pydantic will raise a validation error because the type is 'str'.
    settings = Settings(
        SUPABASE_URL=os.getenv("SUPABASE_URL"),
        SUPABASE_KEY=os.getenv("SUPABASE_KEY"),
    )
except ValidationError:
    print("FATAL ERROR: Missing environment variables.")
    print("Please ensure SUPABASE_URL and SUPABASE_KEY are defined in your .env file.")
    # Exit the application if settings are not valid
    exit(1)
