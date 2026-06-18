import { BlogPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "blog");

export default function GermanBlogPage() {
  return <BlogPage locale="de" />;
}
