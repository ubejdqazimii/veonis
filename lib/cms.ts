import "server-only";

import type { BlogArticleContent, BlogPost, Locale, PageContent, PageKey } from "@/lib/veonis-content";
import { blogPosts, getBlogArticle, getBlogPost, getPage } from "@/lib/veonis-content";

export type ManagedNavigationItem = {
  label: string;
  href: string;
  group: "primary" | "utility" | "footer";
  sort_order: number;
};

function cmsUrl(path: string) {
  const baseUrl = process.env.CMS_API_URL?.replace(/\/$/, "");

  return baseUrl ? `${baseUrl}${path}` : null;
}

export async function getManagedPage(locale: Locale, key: PageKey): Promise<PageContent> {
  const fallback = getPage(locale, key);
  const url = cmsUrl(`/api/v1/pages/${locale}/${key}`);

  if (!url) return fallback;

  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: [`page:${locale}:${key}`] } });

    if (!response.ok) return fallback;

    const payload = (await response.json()) as { data?: PageContent };

    return payload.data?.title ? payload.data : fallback;
  } catch {
    return fallback;
  }
}

export async function getManagedNavigation(locale: Locale): Promise<ManagedNavigationItem[] | null> {
  const url = cmsUrl(`/api/v1/navigation/${locale}`);

  if (!url) return null;

  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: [`navigation:${locale}`] } });

    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: ManagedNavigationItem[] };

    return payload.data ?? null;
  } catch {
    return null;
  }
}

type CmsBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  alt: string;
  intro?: string[];
  sections?: BlogArticleContent["sections"];
  takeaways?: string[];
};

function adaptBlogPost(post: CmsBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: { de: post.title, en: post.title },
    excerpt: { de: post.excerpt, en: post.excerpt },
    category: { de: post.category, en: post.category },
    readTime: { de: post.readTime, en: post.readTime },
    image: post.image,
    alt: { de: post.alt, en: post.alt },
  };
}

export async function getManagedBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const url = cmsUrl(`/api/v1/blog-posts/${locale}`);

  if (!url) return blogPosts;

  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: [`blog:${locale}`] } });
    if (!response.ok) return blogPosts;

    const payload = (await response.json()) as { data?: CmsBlogPost[] };
    return payload.data?.map(adaptBlogPost) ?? blogPosts;
  } catch {
    return blogPosts;
  }
}

export async function getManagedBlogArticle(locale: Locale, slug: string) {
  const fallbackPost = getBlogPost(slug);
  const fallbackArticle = getBlogArticle(slug, locale);
  const url = cmsUrl(`/api/v1/blog-posts/${locale}/${slug}`);

  if (!url) return fallbackPost && fallbackArticle ? { post: fallbackPost, article: fallbackArticle } : null;

  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: [`blog:${locale}:${slug}`] } });
    if (!response.ok) return fallbackPost && fallbackArticle ? { post: fallbackPost, article: fallbackArticle } : null;

    const payload = (await response.json()) as { data?: CmsBlogPost };
    if (!payload.data) return null;

    return {
      post: adaptBlogPost(payload.data),
      article: {
        intro: payload.data.intro ?? [],
        sections: payload.data.sections ?? [],
        takeaways: payload.data.takeaways ?? [],
      } satisfies BlogArticleContent,
    };
  } catch {
    return fallbackPost && fallbackArticle ? { post: fallbackPost, article: fallbackArticle } : null;
  }
}
