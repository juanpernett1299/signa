from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.pais import PaisInDBBase
from app.db import pais as paisDAO

router = APIRouter()

@router.get("/", response_model=List[PaisInDBBase])
def read_paises():
    return paisDAO.get_all()