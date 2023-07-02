'use client';

import { useEffect, useState } from "react";

export default function ArticleData({ slug, type, downloadsType }: {
  slug: string,
  type: 'views' | 'downloads',
  downloadsType?: 'problems' | 'answer-key',
}) {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (type === 'downloads' && downloadsType) {
      fetch(`/api/${type}?slug=${slug}&type=${downloadsType}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((json) => {
        setData(json.downloads || 0);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
      return;
    } else if (type === 'views') {
      fetch(`/api/${type}?slug=${slug}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((json) => {
        setData(json[type] || 0);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    }
  }, [slug, type, downloadsType]);

  return (
    isLoading ?
    <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </> :
    <>{data}</>
  )
}