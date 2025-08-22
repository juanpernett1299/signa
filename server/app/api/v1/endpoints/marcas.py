from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.marca import Marca, MarcaCreate, MarcaPagination, MarcaUpdate
from app.db import marca as marcaDAO

router = APIRouter()


@router.get("/", response_model=MarcaPagination)
def read_marcas(
    skip: int = 0,
    limit: int = 100
):
    """
    Retrieve marcas.
    """
    try:
        marcas = marcaDAO.get_multi(skip=skip, limit=limit)
        return MarcaPagination(
            items=marcas,
            total=len(marcas),
            page=skip,
            limit=limit
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving marcas: {str(e)}"
        )


@router.post("/", response_model=Marca, status_code=status.HTTP_201_CREATED)
def create_marca(
    *,
    marca_in: MarcaCreate
):
    """
    Create new marca.
    """
    try:
        existing_marca = marcaDAO.get_by_nombre(nombre=marca_in.nombre)
        if existing_marca:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A marca with this name already exists."
            )
        
        created_marca = marcaDAO.create(marca_in=marca_in)
        return created_marca
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating marca: {str(e)}"
        )


@router.get("/{marca_id}", response_model=Marca)
def read_marca(
    *,
    marca_id: int
):
    """
    Get marca by ID.
    """
    try:
        marca = marcaDAO.get(marca_id=marca_id)
        if not marca:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Marca not found"
            )
        return marca
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving marca: {str(e)}"
        )


@router.put("/{marca_id}", response_model=Marca)
def update_marca(
    *,
    marca_id: int,
    marca_in: MarcaUpdate
):
    """
    Update marca.
    """
    try:
        updated_marca = marcaDAO.update(marca_id=marca_id, marca_in=marca_in)
        if updated_marca is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Marca not found"
            )
        return updated_marca
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating marca: {str(e)}"
        )


@router.delete("/{marca_id}")
def delete_marca(
    *,
    marca_id: int
):
    """
    Delete marca.
    """
    try:
        deleted_marca = marcaDAO.delete(marca_id=marca_id)
        if deleted_marca is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Marca not found"
            )
        return {"message": "Marca deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting marca: {str(e)}"
        )