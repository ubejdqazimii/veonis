"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const endpoint = "/api/analytics";

// Analytics is best-effort and must never interrupt the visitor's experience.
async function sendEvent(payload: Record<string, unknown>) {
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Offline visitors and blocked analytics can continue using the site.
  }
}

type VisitorLocation = { country: string | null; region: string | null; city: string | null };

function getVisitorLocation(): Promise<VisitorLocation> {
  return fetch("/api/analytics", { cache: "no-store" })
    .then((response) => response.json() as Promise<VisitorLocation>)
    .catch(() => ({ country: null, region: null, city: null }));
}

function sessionId() {
  const key = "veonis_analytics_session";
  try {
    const existing = sessionStorage.getItem(key);

    if (existing) return existing;

    const created = crypto.randomUUID();
    sessionStorage.setItem(key, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || navigator.webdriver || ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) return;

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

    void getVisitorLocation().then((location) => sendEvent({ ...payload, ...location }));

    const reportPresence = () => {
      if (document.visibilityState !== "visible") return;

      const seconds = Math.min(86400, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));

      void sendEvent({
        event_type: "heartbeat",
        session_id: payload.session_id,
        path: pathname,
        engagement_seconds: seconds,
      });
    };

    const heartbeat = window.setInterval(reportPresence, 30_000);
    document.addEventListener("visibilitychange", reportPresence);

    const reportEngagement = () => {
      const seconds = Math.min(86400, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));
      void sendEvent({
        event_type: "engagement",
        session_id: payload.session_id,
        path: pathname,
        engagement_seconds: seconds,
      });
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
