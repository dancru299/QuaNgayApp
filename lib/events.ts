import type { EventPayload } from "@/lib/types";

export function logEvent(eventName: string, payload: EventPayload) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  console.info(JSON.stringify(event));
}
