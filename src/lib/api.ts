import { NextResponse } from "next/server";
import type { DownloadType } from "./download-types";

export async function getViews(slug?: string) {
  const url = slug
    ? `/api/views?slug=${encodeURIComponent(slug)}`
    : `/api/views`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok)
    throw Object.assign(new Error("GET /views failed"), { status: res.status });
  return res.json() as Promise<{ views: number }>;
}

export async function getAllViews() {
  const res = await fetch("/api/views/all", { method: "GET" });
  if (!res.ok)
    throw Object.assign(new Error("GET /views/all failed"), {
      status: res.status,
    });
  return res.json() as Promise<{
    total: number;
    byslug: Record<string, number>;
  }>;
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

export async function getAllDownloads() {
  const res = await fetch("/api/downloads/all", { method: "GET" });
  if (!res.ok)
    throw Object.assign(new Error("GET /downloads/all failed"), {
      status: res.status,
    });
  return res.json() as Promise<{
    total: number;
    byslug: Record<string, Partial<Record<DownloadType, number>>>;
  }>;
}

export async function postDownload(slug: string, type: DownloadType) {
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

export function serverError(label: string, err: unknown) {
  console.error(label, err);
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
