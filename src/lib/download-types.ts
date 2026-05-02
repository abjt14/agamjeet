export const DOWNLOAD_TYPES = ["problems", "answer-key"] as const;
export type DownloadType = (typeof DOWNLOAD_TYPES)[number];

export function isValidDownloadType(type: string | null): type is DownloadType {
  return type !== null && (DOWNLOAD_TYPES as readonly string[]).includes(type);
}
