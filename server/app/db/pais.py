from app.schemas.pais import PaisInDBBase
from .database import supabase

def get_all():
    response = supabase.table("paises").select("*").execute()
    return response.data