import { allArticles } from "contentlayer/generated";

export default async function sitemap() {
  const articles = allArticles.map((post) => ({
    url: `https://agamjeet.com/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/about", "/stats"].map((route) => ({
    url: `https://agamjeet.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...articles];
}
