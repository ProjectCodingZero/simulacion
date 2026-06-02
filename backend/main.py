# This is a sample Python script.
import asyncio
from csv import DictReader

from fastapi import FastAPI
import socketio
from api.api import main_router
from api.websocket import sio
from stadistic import pruebas, rng, probabilidad
from log import logger


app = FastAPI(title="Simulacion")
socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="")

app.include_router(main_router)
app.mount("/ws", socket_app)

# Press the green button in the gutter to run the script.
if __name__ == "__main__":
    generador = rng.generador
    # print(generador.mixto(10))
    print(probabilidad.normal(150, 50))
    print(probabilidad.binomial([0.5]))
    print(probabilidad.poisson(60))

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
