# Despliegue con Docker

Este proyecto queda preparado para correr localmente con Docker con dos servicios:

- `frontend`: Vite levanta la app React dentro del contenedor.
- `backend`: FastAPI/Uvicorn queda interno dentro de la red Docker.

En produccion no hace falta publicar el puerto `8000` del backend desde este compose.
El servicio `frontend` publica el puerto `8080` en el host y Vite proxya `/api` y `/ws` hacia el backend interno.

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
FRONTEND_PORT=8080
BACKEND_DEV_PORT=8000
FRONTEND_DEV_PORT=5173
```

`FRONTEND_PORT` aplica al compose base. Las variables `BACKEND_DEV_PORT` y `FRONTEND_DEV_PORT` son para el compose de desarrollo alternativo. Para ejecucion local sin Docker no son obligatorias: el backend usa `backend/.env` y el frontend, por defecto, proxya `/api` y `/ws` contra `http://localhost:8000`.

## Levantar con Docker

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
http://localhost:8080
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

## Notas

- El servicio `frontend` escucha internamente en `8080`.
- El frontend usa el proxy de Vite para `/api` y `/ws`.
- No publicar `backend:8000` en produccion salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
