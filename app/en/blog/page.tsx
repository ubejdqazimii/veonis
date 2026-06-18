import { BlogPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "blog");

export default function EnglishBlogPage() {
  return <BlogPage locale="en" />;
}
