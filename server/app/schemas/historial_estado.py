from pydantic import BaseModel
from datetime import datetime


class HistorialEstado(BaseModel):
    marca_id: int
    estado: str

class HistorialEstadoInDBBase(HistorialEstado):
    id: int
    fecha: datetime