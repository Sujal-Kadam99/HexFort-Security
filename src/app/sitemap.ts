import type { MetadataRoute } from "next";

const pages = ["", "/services", "/pricing", "/methodology", "/about", "/support", "/contact", "/engagement", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({ url: `https://hexfortsecurity.in${page}`, changeFrequency: "monthly", priority: page === "" ? 1 : 0.7 }));
}
