import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop") ?? "shopee";
  const query = (url.searchParams.get("q") ?? "").trim();

  if (shop !== "shopee" || !query) {
    return NextResponse.json(
      { error: "Redirect không hợp lệ." },
      { status: 400 }
    );
  }

  const target = buildShopeeSearchUrl(query, url.searchParams.get("ref"));
  const timeToClick = Number(url.searchParams.get("ttc"));

  logEvent("outbound_click", {
    sessionId: url.searchParams.get("session") ?? undefined,
    occasion: url.searchParams.get("ref") ?? undefined,
    giftType: url.searchParams.get("arc") ?? undefined,
    giftArchetype: url.searchParams.get("arc") ?? undefined,
    shoppingQuery: query,
    source: url.searchParams.get("source") === "ai" ? "ai" : "fallback",
    clicked: true,
    timeToClick_ms: Number.isFinite(timeToClick) ? timeToClick : undefined,
    shared: false,
    giftId: url.searchParams.get("gift") ?? undefined
  });

  return NextResponse.redirect(target, 302);
}

function buildShopeeSearchUrl(query: string, ref: string | null) {
  const target = new URL("https://shopee.vn/search");
  target.searchParams.set("keyword", query);
  target.searchParams.set("utm_source", "quangay");
  target.searchParams.set("utm_medium", "affiliate_redirect");

  if (ref) {
    target.searchParams.set("utm_campaign", ref);
  }

  const affiliateTag = process.env.SHOPEE_AFFILIATE_TAG?.trim();
  if (affiliateTag) {
    target.searchParams.set("affiliate_id", affiliateTag);
  }

  return target;
}
