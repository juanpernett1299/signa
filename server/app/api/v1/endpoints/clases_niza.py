from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.clase_niza import ClaseNizaInDBBase
from app.db import clase_niza as claseNizaDAO

router = APIRouter()

@router.get("/", response_model=List[ClaseNizaInDBBase])
def read_clases_niza():
    """
    Get all clases niza.
    """
    try:
        return claseNizaDAO.get_all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving clases niza: {str(e)}"
        )