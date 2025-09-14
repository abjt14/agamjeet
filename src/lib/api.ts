export async function getViews(slug?: string) {
  const url = slug
    ? `/api/views?slug=${encodeURIComponent(slug)}`
    : `/api/views`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok)
    throw Object.assign(new Error("GET /views failed"), { status: res.status });
  return res.json() as Promise<{ views: number }>;
}

export async function postView(slug: string) {
  const res = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, {
    method: "POST",
  });
  if (!res.ok)
    throw Object.assign(new Error("POST /views failed"), {
      status: res.status,
    });
  return res.json() as Promise<{ views: number }>;
}

export async function getDownloads(
  slug?: string,
  type?: "problems" | "answer-key"
) {
  const qs = new URLSearchParams();
  if (slug !== undefined) qs.set("slug", slug);
  if (type) qs.set("type", type);
  const res = await fetch(`/api/downloads?${qs.toString()}`, { method: "GET" });
  if (!res.ok)
    throw Object.assign(new Error("GET /downloads failed"), {
      status: res.status,
    });
  return res.json() as Promise<{ downloads: number; type?: string | null }>;
}

export async function postDownload(
  slug: string,
  type: "problems" | "answer-key"
) {
  const qs = new URLSearchParams({ slug, type });
  const res = await fetch(`/api/downloads?${qs.toString()}`, {
    method: "POST",
  });
  if (!res.ok)
    throw Object.assign(new Error("POST /downloads failed"), {
      status: res.status,
    });
  return res.json() as Promise<{ downloads: number; type: string }>;
}
