from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum


class EstadoMarca(str, Enum):
    SOLICITUD_PRESENTADA = "solicitud_presentada"
    EXAMEN_FORMAL = "examen_formal"
    EXAMEN_FONDO = "examen_fondo"
    PUBLICACION_GACETA = "publicacion_gaceta"
    OPOSICIONES = "oposiciones"
    OTORGADA = "otorgada"
    RENOVACION = "renovacion"


class MarcaBase(BaseModel):
    nombre: str
    titular: str
    descripcion: Optional[str] = None
    logo_url: Optional[str] = None
    clase_niza_id: Optional[int] = None
    pais_id: Optional[int] = None
    estado: EstadoMarca = EstadoMarca.SOLICITUD_PRESENTADA


class MarcaCreate(MarcaBase):
    pass


class MarcaUpdate(BaseModel):
    nombre: Optional[str] = None
    titular: Optional[str] = None
    descripcion: Optional[str] = None
    logo_url: Optional[str] = None
    clase_niza_id: Optional[int] = None
    pais_id: Optional[int] = None
    estado: Optional[EstadoMarca] = None


class MarcaInDBBase(MarcaBase):
    id: int
    fecha_registro: datetime

    model_config = {"from_attributes": True}

class MarcaPagination(BaseModel):
    items: List[MarcaInDBBase]
    total: int
    page: int
    limit: int
