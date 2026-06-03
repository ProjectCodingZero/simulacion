# Despliegue con Docker

Este proyecto queda preparado para correr en una VPS con dos servicios:

- `frontend`: Deno sirve la app Vite compilada dentro del contenedor.
- `backend`: FastAPI/Uvicorn queda interno dentro de la red Docker.

En produccion no hace falta publicar el puerto `8000` del backend desde este compose.
La configuracion de proxy o reverse proxy queda fuera de este compose. El servicio `frontend` queda disponible en la red Docker `app-entry` y escucha internamente en `8080`.

## Requisitos en la VPS

- Docker Engine
- Docker Compose plugin

## Configuracion

Copiar el archivo de ejemplo y ajustar valores si hace falta:

```bash
cp .env.example .env
```

Variables principales:

```env
BACKEND_DEV_PORT=8000
FRONTEND_DEV_PORT=5173
```

Estas variables son para desarrollo con Docker Compose. Para ejecucion local sin Docker no son obligatorias: el backend usa `backend/.env` y el frontend, por defecto, proxya `/api` y `/ws` contra `http://localhost:8000`.

## Produccion

Construir y levantar:

```bash
docker compose up -d --build
```

Ver estado:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f
```

Detener:

```bash
docker compose down
```

Actualizar luego de subir cambios:

```bash
git pull
docker compose up -d --build
```

La app queda disponible en:

```text
frontend:8080 dentro de la red Docker de entrada del proyecto
```

## Desarrollo local con Docker

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

URLs locales:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

En desarrollo con Docker, el frontend usa `API_URL=http://backend:8000/api` y `BACKEND_ORIGIN=http://backend:8000` dentro de la red Docker. En desarrollo sin Docker, esos valores pueden omitirse.

## Notas para VPS

- El servicio `frontend` escucha internamente en `8080`.
- El servicio `frontend` esta conectado a `app-entry`, una red no interna pensada para que un proxy externo de la VPS pueda alcanzarlo.
- La publicacion HTTP/HTTPS y las rutas de proxy para `/api` y `/ws` se configuran por fuera de este proyecto.
- No publicar `backend:8000` en produccion salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
