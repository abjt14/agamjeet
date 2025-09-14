"use client";

import { useIncrementView, useViews } from "@/lib/queries";
import { useEffect } from "react";

export default function ArticleViews({
  slug,
  trackView,
}: {
  slug: string;
  trackView: boolean;
}) {
  const { data, isPending } = useViews(slug);
  const { mutate } = useIncrementView(slug);

  useEffect(() => {
    trackView && mutate();
  }, [trackView, mutate]);

  return (
    <>
      <span>&#10022;</span>
      <span className="flex items-center gap-1">
        {isPending ? (
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
        ) : (
          <span>{data?.views ?? 0}</span>
        )}
        views
      </span>
    </>
  );
}
