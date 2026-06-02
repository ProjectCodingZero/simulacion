import socketio
from stadistic.rng import generador
from log import logger
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
@sio.event
async def connect(sid, environ):
    logger.info(f"✅ Cliente conectado: {sid}")


@sio.event
async def disconnect(sid):
    logger.info(f"❌ Cliente desconectado: {sid}")


# Aquí atrapas el evento exacto que envíes desde React
@sio.on("setSeed")
async def manejar_simulacion(sid, data):

    logger.info(f"📩 Mensaje de simulación recibido [{sid}]: {data['seed'], data['cable']}")
    generador.seed = data['seed']
    logger.info(f"semilla esteblecida: {generador.seed}")
    # Responderle de vuelta al cliente
    await sio.emit("respuestaServidor", f"Procesado con éxito: {data}", to=sid)

