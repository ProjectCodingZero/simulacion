FROM denoland/deno:2.5.6 AS builder

WORKDIR /app

COPY deno.json deno.lock ./
RUN deno cache --lock=deno.lock --config=deno.json npm:vite@7.2.7

COPY . .
RUN deno task build

FROM nginx:1.29-alpine

RUN addgroup -S app && adduser -S -G app app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R app:app /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx \
    && touch /run/nginx.pid \
    && chown app:app /run/nginx.pid

USER app

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
