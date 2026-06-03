# Docker Compose

Este proyecto corre con un unico `docker-compose.yml`:

- `frontend`: Vite levanta la app React dentro del contenedor.
- `backend`: FastAPI/Uvicorn queda interno dentro de la red Docker.

No se publica el puerto del backend. El frontend publica HTTP en el host y Vite proxya `/api` y `/ws` hacia `backend`.

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
BACKEND_PORT=8000
BACKEND_DEBUG=false
```

Compose lee `.env` automaticamente para interpolar estos valores. Si no existe `.env`, se usan los defaults definidos en `docker-compose.yml`.
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

La app queda disponible en:

```text
http://localhost:8080
```

## Notas

- El servicio `frontend` escucha internamente en `8080`.
- El frontend usa el proxy de Vite para `/api` y `/ws`.
- No publicar `backend:8000` salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
