const normalizeNumber = (value?: string) => value?.replace(/\D/g, "");

export const siteConfig = {
  businessName: "Website Demo",
  email: "hello@websitedemo.example",
  whatsappNumber: normalizeNumber(import.meta.env.VITE_WHATSAPP_NUMBER),
  paymentUrl: import.meta.env.VITE_PAYMENT_URL,
  orderEndpoint: import.meta.env.VITE_ORDER_ENDPOINT,
  starterPriceUsd: Number(import.meta.env.VITE_STARTER_PRICE_USD ?? 20),
  starterPriceNaira: Number(import.meta.env.VITE_STARTER_PRICE_NAIRA ?? 30000),
};

export const whatsappUrl = (message: string) => {
  const number = siteConfig.whatsappNumber;
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : undefined;
};
