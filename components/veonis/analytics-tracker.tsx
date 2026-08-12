"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const endpoint = "/api/analytics";

function sessionId() {
  const key = "veonis_analytics_session";
  const existing = sessionStorage.getItem(key);

  if (existing) return existing;

  const created = crypto.randomUUID();
  sessionStorage.setItem(key, created);
  return created;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || navigator.webdriver || window.location.hostname === "localhost") return;

    const startedAt = Date.now();
    const parameters = new URLSearchParams(window.location.search);
    const payload = {
      event_type: "page_view",
      session_id: sessionId(),
      path: pathname,
      page_title: document.title,
      locale: pathname.split("/")[1] === "en" ? "en" : "de",
      referrer: document.referrer || null,
      source: parameters.get("utm_source"),
      medium: parameters.get("utm_medium"),
      campaign: parameters.get("utm_campaign"),
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    };

    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    const reportPresence = () => {
      if (document.visibilityState !== "visible") return;

      const seconds = Math.min(86400, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));

      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "heartbeat",
          session_id: payload.session_id,
          path: pathname,
          engagement_seconds: seconds,
        }),
        keepalive: true,
      });
    };

    const heartbeat = window.setInterval(reportPresence, 30_000);
    document.addEventListener("visibilitychange", reportPresence);

    const reportEngagement = () => {
      const seconds = Math.min(86400, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));
      const body = JSON.stringify({
        event_type: "engagement",
        session_id: payload.session_id,
        path: pathname,
        engagement_seconds: seconds,
      });

      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    };

    window.addEventListener("pagehide", reportEngagement, { once: true });

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", reportPresence);
      window.removeEventListener("pagehide", reportEngagement);
      reportEngagement();
    };
  }, [pathname]);

  return null;
}
