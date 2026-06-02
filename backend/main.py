import socketio
from fastapi import FastAPI

from api.api import main_router
from aplication.simulation_handler import simulation_handler
from core.configs import settings
from log import logger

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
app = FastAPI(title="Simulacion")
socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="")


@sio.event
async def connect(sid, environ):
    logger.info(f"Cliente conectado: {sid}")


@sio.event
async def disconnect(sid):
    logger.info(f"Cliente desconectado: {sid}")


@sio.on("setSeed")
async def manejar_simulacion(sid, data):
    await simulation_handler.handle_set_seed(sio, sid, data)


app.include_router(main_router)
app.mount("/ws", socket_app)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)
