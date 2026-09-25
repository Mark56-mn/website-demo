import { describe, expect, it } from "vitest";
import { formatOrderForWhatsApp, initialOrder, validateOrder } from "./order";

describe("order validation", () => {
  it("requires the core business and contact fields", () => {
    const errors = validateOrder(initialOrder);
    expect(errors.businessName).toBeTruthy();
    expect(errors.country).toBeTruthy();
    expect(errors.phone).toBeTruthy();
  });

  it("validates optional email, URL, and phone values", () => {
    const errors = validateOrder({ ...initialOrder, email: "bad", phone: "123", facebookUrl: "facebook.com/test" });
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.facebookUrl).toBeTruthy();
  });

  it("creates a complete WhatsApp order summary", () => {
    const message = formatOrderForWhatsApp({ ...initialOrder, businessName: "Ada Foods", country: "Nigeria", city: "Lagos", phone: "+2348000000000" });
    expect(message).toContain("Ada Foods");
    expect(message).toContain("Lagos, Nigeria");
    expect(message).toContain("+2348000000000");
  });
});
