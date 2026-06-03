# Docker Compose

Este proyecto usa dos archivos de Compose:

- `docker-compose.yml`: base para Dokploy, sin puertos publicados en el host.
- `docker-compose.local.yml`: override local para publicar el frontend.

- `frontend`: Vite levanta la app React dentro del contenedor.
- `backend`: FastAPI/Uvicorn queda disponible solo dentro de la red Docker del compose.

El frontend expone internamente `8080` y Vite proxya `/api` y `/ws` hacia `backend`. Dokploy debe publicar el servicio mediante su proxy, no mediante `ports` del compose.

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
VITE_ALLOWED_HOSTS=utnfrt.bonar.tech
```

Compose lee `.env` automaticamente para interpolar estos valores. Si no existe `.env`, se usan los defaults definidos en `docker-compose.yml`.
El backend siempre escucha en `0.0.0.0` dentro del contenedor; eso no es una variable de despliegue.

## Levantar

En Dokploy, usar solo:

```bash
docker compose up -d --build
```

En local, usar el override:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
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

En Dokploy, configurar el dominio/aplicacion apuntando al servicio frontend en el puerto interno:

```text
frontend:8080
```

En local, la app queda disponible en:

```text
http://localhost:${FRONTEND_PORT}
```

## Notas

- El servicio `frontend` escucha internamente en `8080`.
- El frontend usa el proxy de Vite para `/api` y `/ws`.
- `VITE_ALLOWED_HOSTS` lista dominios permitidos por `vite preview`, separados por coma.
- Frontend y backend comparten una unica red Docker normal para evitar ambiguedad de ruteo en Dokploy/Traefik.
- No usar `docker-compose.local.yml` en Dokploy.
- No publicar `backend:8000` salvo que haya una necesidad explicita.
- Mantener secretos reales fuera del repositorio; usar `.env` o el gestor de secretos de la plataforma.
