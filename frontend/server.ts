const root = new URL("./dist/", import.meta.url);

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function contentType(path: string): string {
  const extension = path.match(/\.[^.\/]+$/)?.[0] ?? "";
  return contentTypes[extension] ?? "application/octet-stream";
}

async function fileResponse(pathname: string, method: string): Promise<Response> {
  const requested = decodeURIComponent(pathname);
  const fileUrl = new URL(`.${requested}`, root);

  if (!fileUrl.href.startsWith(root.href)) {
    return new Response("Forbidden", { status: 403 });
  }

  let target = fileUrl;

  try {
    const stat = await Deno.stat(target);
    if (stat.isDirectory) {
      target = new URL("index.html", target);
    }
  } catch {
    target = new URL("index.html", root);
  }

  const file = await Deno.open(target, { read: true });
  const headers = new Headers({ "Content-Type": contentType(target.pathname) });

  if (method === "HEAD") {
    file.close();
    return new Response(null, { headers });
  }

  return new Response(file.readable, { headers });
}

Deno.serve({ hostname: "0.0.0.0", port: 8080 }, (request) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const url = new URL(request.url);
  return fileResponse(url.pathname, request.method);
});
