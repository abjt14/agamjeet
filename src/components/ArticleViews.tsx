'use client';

import { useEffect } from "react";

export default function ArticleViews({ slug }: {
  slug: string
}) {
  useEffect(() => {
    fetch(`/api/views?slug=${slug}`, {
      method: 'GET',
    }).then((res) => console.log(res.json()));
  }, [slug]);

  return <></>
}