from fastapi import APIRouter
from ..services import provider

router = APIRouter()

@router.get('/teams')
async def teams():
    return await provider.list_teams()

@router.get('/venues')
async def venues():
    return await provider.list_venues()

@router.get('/matches')
async def matches():
    return await provider.list_matches()
