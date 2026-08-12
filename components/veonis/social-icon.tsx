import type { ManagedSocialLink } from "@/lib/cms";

type SocialIconProps = Pick<ManagedSocialLink, "label" | "short_label" | "url"> & {
  className?: string;
};

const paths = {
  facebook:
    "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.93-1.956 1.887v2.261h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073Z",
  instagram:
    "M12 2.162c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433A2.062 2.062 0 1 1 5.337 3.31a2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  youtube:
    "M23.499 6.203a3.008 3.008 0 0 0-2.117-2.131C19.505 3.568 12 3.568 12 3.568s-7.505 0-9.382.504A3.008 3.008 0 0 0 .501 6.203 31.36 31.36 0 0 0 0 12a31.36 31.36 0 0 0 .501 5.797 3.008 3.008 0 0 0 2.117 2.131c1.877.504 9.382.504 9.382.504s7.505 0 9.382-.504a3.008 3.008 0 0 0 2.117-2.131A31.36 31.36 0 0 0 24 12a31.36 31.36 0 0 0-.501-5.797ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
} as const;

function getPlatform({ label, short_label, url }: SocialIconProps): keyof typeof paths | null {
  const value = `${label} ${short_label} ${url}`.toLowerCase();

  if (value.includes("linkedin") || /\bin\b/.test(value)) return "linkedin";
  if (value.includes("instagram") || /\big\b/.test(value)) return "instagram";
  if (value.includes("facebook") || /\bfb\b/.test(value)) return "facebook";
  if (value.includes("youtube") || /\byt\b/.test(value)) return "youtube";
  if (value.includes("twitter") || value.includes("x.com") || /\bx\b/.test(value)) return "x";

  return null;
}

export function SocialIcon({ className = "size-4", ...social }: SocialIconProps) {
  const platform = getPlatform(social);

  if (!platform) {
    return <span className="text-[10px] font-semibold uppercase">{social.short_label}</span>;
  }

  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d={paths[platform]} />
    </svg>
  );
}
