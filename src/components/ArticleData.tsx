"use client";

import { useAllDownloads, useAllViews } from "@/lib/queries";
import type { DownloadType } from "@/lib/download-types";

function ViewsCounter({ slug }: { slug: string }) {
  const { data, isLoading } = useAllViews();
  if (isLoading) return <Spinner />;
  const value = slug === "" ? data?.total : data?.byslug[slug];
  return <>{value ?? 0}</>;
}

function DownloadsCounter({
  slug,
  type,
}: {
  slug: string;
  type: DownloadType | "any";
}) {
  const { data, isLoading } = useAllDownloads();
  if (isLoading) return <Spinner />;

  if (slug === "") {
    return <>{data?.total ?? 0}</>;
  }

  const counts = data?.byslug[slug];
  const lookupType: DownloadType = type === "any" ? "problems" : type;
  return <>{counts?.[lookupType] ?? 0}</>;
}

export default function ArticleData({
  slug,
  type,
  downloadsType = "any",
}: {
  slug: string;
  type: "views" | "downloads";
  downloadsType?: DownloadType | "any";
}) {
  if (type === "views") return <ViewsCounter slug={slug} />;
  return <DownloadsCounter slug={slug} type={downloadsType} />;
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className="w-3 h-3 animate-spin"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}
