import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getViews,
  postView,
  postDownload,
  getAllViews,
  getAllDownloads,
} from "./api";
import type { DownloadType } from "./download-types";

export function useViews(slug?: string) {
  return useQuery({
    queryKey: ["views", slug ?? "TOTAL"],
    queryFn: () => getViews(slug),
  });
}

export function useAllViews() {
  return useQuery({
    queryKey: ["views", "ALL"],
    queryFn: getAllViews,
  });
}

export function useIncrementView(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => postView(slug),

    onMutate: async () => {
      const key = ["views", slug];
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<{ views: number }>(key);

      if (prev) {
        qc.setQueryData(key, { views: prev.views + 1 });
      }
      return { prev };
    },

    onSuccess: (data) => {
      qc.setQueryData(["views", slug], data);
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["views", slug], ctx.prev);
    },
  });
}

export function useAllDownloads() {
  return useQuery({
    queryKey: ["downloads", "ALL"],
    queryFn: getAllDownloads,
  });
}

export function useRegisterDownload(slug: string, type: DownloadType) {
  return useMutation({
    mutationFn: () => postDownload(slug, type),
  });
}
