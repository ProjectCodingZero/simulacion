# Despliegue con Docker

Este proyecto queda preparado para correr en una VPS con dos servicios:

- `frontend`: nginx sirve la app Vite compilada y publica el puerto HTTP.
- `backend`: FastAPI/Uvicorn queda interno dentro de la red Docker.

El frontend reenvia `/api` y `/ws` al backend, por lo que en produccion no hace falta publicar el puerto `8000`.

## Requisitos en la VPS

- Docker Engine
- Docker Compose plugin
- Acceso al puerto publico elegido, por defecto `80`

## Configuracion

Copiar el archivo de ejemplo y ajustar valores si hace falta:

```bash
cp .env.example .env
```

Variables principales:

```env
PUBLIC_HTTP_PORT=80
BACKEND_DEV_PORT=8000
FRONTEND_DEV_PORT=5173
```

Estas variables son para Docker Compose. Para ejecucion local sin Docker no son obligatorias: el backend usa `backend/.env` y el frontend, por defecto, proxya `/api` y `/ws` contra `http://localhost:8000`.

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
http://IP_DE_LA_VPS/
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

- Para HTTPS, poner Caddy, Traefik o nginx de host delante del puerto publicado por `frontend`.
- No publicar `backend:8000` en produccion salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
