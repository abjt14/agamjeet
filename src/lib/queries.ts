import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getViews, postView, getDownloads, postDownload } from "./api";

export function useViews(slug?: string) {
  return useQuery({
    queryKey: ["views", slug ?? "TOTAL"],
    queryFn: () => getViews(slug),
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
      qc.setQueryData(["views", slug], data); // { views: number }
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["views", slug], ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["views", slug] });
    },
  });
}

export function useDownloads(slug: string, type: "problems" | "answer-key") {
  return useQuery({
    queryKey: ["downloads", slug, type],
    queryFn: () => getDownloads(slug, type),
  });
}

export function useRegisterDownload(
  slug: string,
  type: "problems" | "answer-key"
) {
  const qc = useQueryClient();
  const key = ["downloads", slug, type];
  return useMutation({
    mutationFn: () => postDownload(slug, type),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<{ downloads: number }>(key);
      qc.setQueryData(key, (d: any) => ({
        downloads: (d?.downloads ?? 0) + 1,
        type,
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ["downloads", "TOTAL"] });
    },
  });
}
