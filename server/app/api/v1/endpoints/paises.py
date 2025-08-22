from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.pais import PaisInDBBase
from app.db import pais as paisDAO

router = APIRouter()

@router.get("/", response_model=List[PaisInDBBase])
def read_paises():
    """
    Get all paises.
    """
    try:
        return paisDAO.get_all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving paises: {str(e)}"
        )