from typing import List, Optional

from .database import supabase
from app.schemas.marca import MarcaCreate, MarcaUpdate, MarcaInDBBase
from app.schemas.historial_estado import HistorialEstado
from datetime import datetime


def get(*, marca_id: int) -> Optional[MarcaInDBBase]:
    """
    Get a single marca by ID.
    """
    response = supabase.table("marcas").select("*").eq("id", marca_id).single().execute()
    return MarcaInDBBase(**response.data)


def get_multi(*, skip: int = 0, limit: int = 100) -> List[MarcaInDBBase]:
    """
    Get multiple marcas with pagination.
    """
    response = supabase.table("marcas").select("*").range(skip, skip + limit - 1).execute()
    return [MarcaInDBBase(**marca) for marca in response.data]


def create(*, marca_in: MarcaCreate) -> MarcaInDBBase:
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
    return MarcaInDBBase(**response.data[0])


def update(*, marca_id: int, marca_in: MarcaUpdate) -> Optional[MarcaInDBBase]:
    """
    Update an existing marca.
    """
    existing_marca = get(marca_id=marca_id)

    update_data = marca_in.model_dump(exclude_unset=True)
    
    if "estado" in update_data and update_data["estado"] is not None:

        if update_data["estado"] != existing_marca.estado:
            # Create a new historial estado
            historial_estado = HistorialEstado(
                marca_id=marca_id,
                estado=update_data["estado"],
            )

            supabase.table("historial_estados").insert(historial_estado.model_dump()).execute()

        update_data["estado"] = update_data["estado"].value
    
    response = supabase.table("marcas").update(update_data).eq("id", marca_id).execute()
    return MarcaInDBBase(**response.data[0]) if response.data else None


def delete(*, marca_id: int) -> Optional[MarcaInDBBase]:
    """
    Delete a marca. Returns the deleted record.
    """
    response = supabase.table("marcas").delete().eq("id", marca_id).execute()
    return MarcaInDBBase(**response.data[0]) if response.data else None


def get_by_nombre(*, nombre: str) -> Optional[MarcaInDBBase]:
    """
    Get a single marca by name.
    """
    response = supabase.table("marcas").select("*").eq("nombre", nombre).single().execute()
    return MarcaInDBBase(**response.data) if response.data else None