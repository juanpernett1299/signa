from typing import List, Optional

from .database import supabase
from app.schemas.marca import MarcaCreate, MarcaUpdate


def get(*, marca_id: int) -> Optional[dict]:
    """
    Get a single marca by ID.
    """
    response = supabase.table("marcas").select("*").eq("id", marca_id).single().execute()
    return response.data


def get_by_nombre(*, nombre: str) -> Optional[dict]:
    """
    Get a single marca by name to check for existence.
    """
    response = supabase.table("marcas").select("id").eq("nombre", nombre).execute()
    return response.data[0] if response.data else None


def get_multi(*, skip: int = 0, limit: int = 100) -> List[dict]:
    """
    Get multiple marcas with pagination.
    """
    response = supabase.table("marcas").select("*").range(skip, skip + limit - 1).execute()
    return response.data


def create(*, marca_in: MarcaCreate) -> dict:
    """
    Create a new marca.
    """
    marca_data = {
        "nombre": marca_in.nombre,
        "titular": marca_in.titular,
        "descripcion": marca_in.descripcion,
        "logo_url": marca_in.logo_url,
        "clase_niza_id": marca_in.clase_niza_id,
        "pais_id": marca_in.pais_id,
        "estado": marca_in.estado.value
    }
    response = supabase.table("marcas").insert(marca_data).execute()
    return response.data[0]


def update(*, marca_id: int, marca_in: MarcaUpdate) -> Optional[dict]:
    """
    Update an existing marca.
    """
    update_data = marca_in.model_dump(exclude_unset=True)
    
    if "estado" in update_data and update_data["estado"] is not None:
        update_data["estado"] = update_data["estado"].value
    
    response = supabase.table("marcas").update(update_data).eq("id", marca_id).execute()
    return response.data[0] if response.data else None


def delete(*, marca_id: int) -> Optional[dict]:
    """
    Delete a marca. Returns the deleted record.
    """
    response = supabase.table("marcas").delete().eq("id", marca_id).execute()
    return response.data[0] if response.data else None


def get_by_estado(*, estado: str) -> List[dict]:
    """
    Get marcas filtered by estado.
    """
    response = supabase.table("marcas").select("*").eq("estado", estado).execute()
    return response.data


def get_by_pais(*, pais_id: int) -> List[dict]:
    """
    Get marcas filtered by pais_id.
    """
    response = supabase.table("marcas").select("*").eq("pais_id", pais_id).execute()
    return response.data
