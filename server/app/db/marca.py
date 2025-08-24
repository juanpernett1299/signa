from typing import List, Optional

from .database import supabase
from app.schemas.marca import MarcaCreate, MarcaUpdate, MarcaInDBBase, EstadoMarca, MarcaFilterParams
from app.schemas.historial_estado import HistorialEstado
from datetime import datetime, date


def _apply_filters_to_query(
    query,
    filters: MarcaFilterParams,
):
    if filters.nombre:
        search_pattern = f'*{filters.nombre}*'
        query = query.ilike("nombre", search_pattern)
    if filters.titular:
        search_pattern = f'*{filters.titular}*'
        query = query.ilike("titular", search_pattern)
    if filters.estados:
        estados_values = [estado.value for estado in filters.estados]
        query = query.in_("estado", estados_values)
    if filters.fecha_desde:
        query = query.gte("fecha_registro", filters.fecha_desde.isoformat())
    if filters.fecha_hasta:
        query = query.lte("fecha_registro", filters.fecha_hasta.isoformat())
    if filters.pais_id is not None:
        query = query.eq("pais_id", filters.pais_id)
    if filters.clase_niza_id is not None:
        query = query.eq("clase_niza_id", filters.clase_niza_id)
    return query


def get(*, marca_id: int) -> Optional[MarcaInDBBase]:
    """
    Get a single marca by ID.
    """
    try:
        response = supabase.table("marcas").select("*").eq("id", marca_id).execute()
        return MarcaInDBBase(**response.data[0])
    except Exception as e:
        print(f"Error getting marca by ID: {e}")
        return None


def get_multi(
    *, 
    skip: int = 0, 
    limit: int = 100,
    filters: MarcaFilterParams,
) -> List[MarcaInDBBase]:
    """
    Get multiple marcas with pagination.
    """
    query = supabase.table("marcas").select("*")
    query = _apply_filters_to_query(query, filters)
    
    response = query.order("id", desc=True).range(skip, skip + limit - 1).execute()
    return [MarcaInDBBase(**marca) for marca in response.data]


def count(
    *,
    filters: MarcaFilterParams,
) -> int:
    """
    Count marcas with filtering.
    """
    query = supabase.table("marcas").select("id", count='exact')
    query = _apply_filters_to_query(query, filters)

    response = query.execute()
    return response.count if response.count is not None else 0


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
    response = supabase.table("marcas").select("id").eq("nombre", nombre).execute()
    return response.data[0] if response.data else None