from pydantic import BaseModel


class ClaseNiza(BaseModel):
    codigo: str
    descripcion: str

class ClaseNizaInDBBase(ClaseNiza):
    id: int