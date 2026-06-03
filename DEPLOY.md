# Docker Compose

Este proyecto corre con un unico `docker-compose.yml`:

- `frontend`: Vite levanta la app React dentro del contenedor.
- `backend`: FastAPI/Uvicorn queda interno dentro de la red Docker.

El frontend publica HTTP en el host usando `FRONTEND_PORT` y Vite proxya `/api` y `/ws` hacia `backend`.

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
FRONTEND_PORT=8081
BACKEND_PORT=8000
BACKEND_DEBUG=false
```

Compose lee `.env` automaticamente para interpolar estos valores. Si no existe `.env`, se usan los defaults definidos en `docker-compose.yml`.
`FRONTEND_PORT` no tiene default en `docker-compose.yml`: debe estar seteado para evitar que un deploy termine ocupando `8080` por accidente.
El backend siempre escucha en `0.0.0.0` dentro del contenedor; eso no es una variable de despliegue.

## Levantar

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

La app queda disponible en el puerto publicado:

```text
http://localhost:${FRONTEND_PORT}
```

## Notas

- El servicio `frontend` escucha internamente en `8080`.
- El frontend usa el proxy de Vite para `/api` y `/ws`.
- En Dokploy, `FRONTEND_PORT` debe estar definido en las variables del despliegue Docker Compose, no solo como variable interna del contenedor.
- No publicar `backend:8000` salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
