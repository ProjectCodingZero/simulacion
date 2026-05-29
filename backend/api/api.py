from fastapi import APIRouter
from log import logger
main_router = APIRouter()

@main_router.get("/api/hello")
async def hello():
    logger.info("Hola mundo");
    return {
        "message": "hola mundo",
    }
@main_router.get("/api/hello/{name}")
async def hello_name(name: str):
    return {
        "name": name,
    }