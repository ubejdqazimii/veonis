import type { ReactNode } from "react";

import { SiteShell } from "@/components/veonis/site-shell";

export default function GermanLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="de">{children}</SiteShell>;
}
