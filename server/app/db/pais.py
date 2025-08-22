from typing import List
from .database import supabase
from app.schemas.pais import PaisInDBBase

def get_all() -> List[PaisInDBBase]:
    response = supabase.table("paises").select("*").execute()
    return [PaisInDBBase(**pais) for pais in response.data]