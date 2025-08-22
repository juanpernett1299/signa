from fastapi import APIRouter
from app.api.v1.endpoints import marcas, paises

api_router = APIRouter()
api_router.include_router(marcas.router, prefix="/marcas", tags=["marcas"])
api_router.include_router(paises.router, prefix="/paises", tags=["paises"])