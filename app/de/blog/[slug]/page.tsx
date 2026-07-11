import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage } from "@/components/veonis/pages";
import { blogPosts, getBlogArticle, getBlogPost, getBlogPostPath } from "@/lib/veonis-content";

type BlogArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const article = getBlogArticle(slug, "de");

  if (!post || !article) {
    return {};
  }

  return {
    title: `${post.title.de} | Veonis Blog`,
    description: post.excerpt.de,
    alternates: {
      canonical: getBlogPostPath("de", slug),
    },
  };
}

export default async function GermanBlogArticleRoute({ params }: BlogArticleRouteProps) {
  const { slug } = await params;

  if (!getBlogPost(slug) || !getBlogArticle(slug, "de")) {
    notFound();
  }

  return <BlogArticlePage locale="de" slug={slug} />;
}
