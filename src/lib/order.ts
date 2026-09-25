export type OrderStatus =
  | "NEW" | "CONTACTED" | "PAYMENT_PENDING" | "PAID" | "BUILDING"
  | "PREVIEW" | "REVISION" | "COMPLETED" | "CANCELLED";

export type OrderData = {
  businessName: string;
  category: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  description: string;
  services: string;
  differentiators: string;
  openingHours: string;
  style: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  otherSocialUrl: string;
  notes: string;
  assetLinks: string;
};

export const initialOrder: OrderData = {
  businessName: "", category: "", country: "", city: "", phone: "", email: "",
  address: "", mapUrl: "", description: "", services: "", differentiators: "", openingHours: "",
  style: "Clean & Professional", facebookUrl: "", instagramUrl: "", tiktokUrl: "",
  otherSocialUrl: "", notes: "", assetLinks: "",
};

const isValidUrl = (value: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

export function validateOrder(data: OrderData) {
  const errors: Partial<Record<keyof OrderData, string>> = {};
  const required: Array<keyof OrderData> = ["businessName", "category", "country", "city", "phone"];
  required.forEach((key) => {
    if (!data[key].trim()) errors[key] = "This field is required.";
  });
  if (data.businessName.length > 100) errors.businessName = "Use 100 characters or fewer.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  (["facebookUrl", "instagramUrl", "tiktokUrl", "otherSocialUrl", "mapUrl"] as const).forEach((key) => {
    if (!isValidUrl(data[key])) errors[key] = "Enter a complete URL beginning with https://";
  });
  if (data.description.length > 1500) errors.description = "Use 1,500 characters or fewer.";
  if (data.notes.length > 1500) errors.notes = "Use 1,500 characters or fewer.";
  return errors;
}

export function formatOrderForWhatsApp(data: OrderData) {
  const optional = (label: string, value: string) => value ? `\n${label}: ${value}` : "";
  return [
    "Hello! I would like to order a $20 business website.",
    `\nBusiness: ${data.businessName}`,
    `\nCategory: ${data.category}`,
    `\nLocation: ${data.city}, ${data.country}`,
    `\nPhone/WhatsApp: ${data.phone}`,
    optional("Email", data.email),
    optional("Address", data.address),
    optional("Google Maps link", data.mapUrl),
    optional("About the business", data.description),
    optional("Services/products", data.services),
    optional("What makes it different", data.differentiators),
    optional("Opening hours", data.openingHours),
    `\nPreferred style: ${data.style}`,
    optional("Social links", [data.facebookUrl, data.instagramUrl, data.tiktokUrl, data.otherSocialUrl].filter(Boolean).join(", ")),
    optional("Asset links", data.assetLinks),
    optional("Additional notes", data.notes),
  ].join("");
}

export async function submitOrder(data: OrderData, endpoint?: string) {
  if (!endpoint) return { ok: false, error: "Online order delivery is not configured yet. Use WhatsApp so your details are not lost." };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...data, status: "NEW" satisfies OrderStatus, submittedAt: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error("We could not send your request. Please try again or use WhatsApp.");
  return { ok: true };
}
