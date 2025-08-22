from pydantic import BaseModel


class Pais(BaseModel):
    nombre: str
    codigo_iso: str

class PaisInDBBase(Pais):
    id: int