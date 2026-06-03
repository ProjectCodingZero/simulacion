FROM denoland/deno:2.5.6 AS builder

WORKDIR /app

COPY deno.json deno.lock ./
RUN deno cache --lock=deno.lock --config=deno.json npm:vite@7.2.7

COPY . .
RUN deno task build

FROM denoland/deno:2.5.6

WORKDIR /app

COPY --chown=deno:deno server.ts ./
COPY --from=builder --chown=deno:deno /app/dist ./dist

USER deno

EXPOSE 8080

CMD ["deno", "run", "--allow-net=0.0.0.0:8080", "--allow-read=/app/dist", "server.ts"]
