'use client';

import { useEffect, useState } from "react";

export default function ArticleViews({ slug, trackView }: {
  slug: string,
  trackView: boolean
}) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/views?slug=${slug}`, {
      method: trackView ? 'POST' : 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      setViews(json.views);
      setIsLoading(false);
    })
    .catch((err) => console.error(err));
  }, [slug, trackView]);

  return (
    isLoading ? (
      <></>
    ) : (
      <>
        <span>•</span>
        <span>{views} views</span>
      </>
    )
  )
}