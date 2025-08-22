from fastapi import APIRouter
from app.api.v1.endpoints import marcas, paises, clases_niza

api_router = APIRouter()
api_router.include_router(marcas.router, prefix="/marcas", tags=["marcas"])
api_router.include_router(paises.router, prefix="/paises", tags=["paises"])
api_router.include_router(clases_niza.router, prefix="/clases_niza", tags=["clases_niza"])