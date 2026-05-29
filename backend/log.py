import logging
# Configuracion de log
logger = logging.getLogger("uvicorn.error")
logger.setLevel(level=logging.INFO)