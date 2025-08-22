from typing import List

from .database import supabase
from app.schemas.clase_niza import ClaseNizaInDBBase

def get_all() -> List[ClaseNizaInDBBase]:
    response = supabase.table("clases_niza").select("*").execute()
    return [ClaseNizaInDBBase(**clase) for clase in response.data]