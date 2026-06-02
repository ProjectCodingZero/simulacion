from fastapi import APIRouter
from fastapi import WebSocket, WebSocketDisconnect
from log import logger

# OBSOLETO: este router de WebSocket nativo no esta montado en main.py.
# El frontend actual usa Socket.IO con path "/ws" y evento "simulationDashboard".
# Se mantiene por referencia hasta decidir si se elimina o se migra.
ws_router = APIRouter()

@ws_router.websocket("api/ws/simulacion")
async def websocket_endpoint(websocket: WebSocket):
    # 1. Aceptamos la conexión del cliente
    logger.info("Coneccion ha sido pedida")
    await websocket.accept()

    try:
        while True:
            # 2. Esperamos recibir un mensaje del cliente (ej: "iniciar")
            data = await websocket.receive_text()

            # 3. Lógica del simulador (aquí enviarías tus datos procesados)
            if data == "iniciar":
                for i in range(1, 6):
                    # Simulamos un proceso que envía datos cada segundo
                    await websocket.send_json({
                        "paso": i,
                        "mensaje": f"Procesando etapa {i}...",
                        "estado": "activo"
                    })
                    import asyncio
                    await asyncio.sleep(1)  # Simulación de tiempo real

    except WebSocketDisconnect:
        print("El cliente se desconectó")
