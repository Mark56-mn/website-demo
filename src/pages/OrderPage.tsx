import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { ArrowRight, Check, Shield } from "../components/Icons";
import { siteConfig, whatsappUrl } from "../config";
import { getSupabaseClient } from "../lib/supabase";
import { setPageMeta } from "../lib/seo";
import { formatOrderForWhatsApp, initialOrder, submitOrder, validateOrder, type OrderData } from "../lib/order";

type Errors = Partial<Record<keyof OrderData, string>>;

const Field = ({ label, required, error, children, hint }: { label: string; required?: boolean; error?: string; children: ReactNode; hint?: string }) => (
  <label className="field"><span>{label}{required && <b> *</b>}</span>{children}{hint && !error && <small>{hint}</small>}{error && <small className="field-error" role="alert">{error}</small>}</label>
);

export default function OrderPage() {
  const [form, setForm] = useState<OrderData>(initialOrder);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [step, setStep] = useState<"form" | "delivery" | "payment">("form");
  const message = formatOrderForWhatsApp(form);
  const chat = whatsappUrl(message);

  useEffect(() => setPageMeta("Build your website — Website Demo", "Tell us about your business and start a professional $20 website project."), []);

  const update = (key: keyof OrderData, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    if (errors[key]) setErrors(current => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateOrder(form);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length) {
      document.querySelector<HTMLElement>(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from("orders").insert({
          business_name: form.businessName,
          category: form.category,
          country: form.country,
          city: form.city,
          phone: form.phone,
          email: form.email || null,
          address: form.address || null,
          map_url: form.mapUrl || null,
          description: form.description || null,
          services: form.services || null,
          differentiators: form.differentiators || null,
          opening_hours: form.openingHours || null,
          style: form.style,
          facebook_url: form.facebookUrl || null,
          instagram_url: form.instagramUrl || null,
          tiktok_url: form.tiktokUrl || null,
          other_social_url: form.otherSocialUrl || null,
          asset_links: form.assetLinks || null,
          notes: form.notes || null,
          status: "NEW",
        });
        if (error) throw new Error(error.message);
        setStep("payment");
      } else if (siteConfig.orderEndpoint) {
        const result = await submitOrder(form, siteConfig.orderEndpoint);
        if (!result.ok) throw new Error(result.error);
        setStep("payment");
      } else if (chat) {
        setStep("delivery");
      } else {
        throw new Error("Online delivery and WhatsApp are not configured. Please add the required environment variables before accepting orders.");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step !== "form") {
    return <SiteLayout><section className="order-complete"><div className="container narrow"><div className="success-mark"><Check /></div><span className="eyebrow">Order details ready</span><h1>{step === "payment" ? "Your request is in. Next: make payment." : "Send your order to finish."}</h1><p>{step === "payment" ? "Your business information has been recorded as a new request. Complete the secure checkout using the link below." : "Online request delivery is not configured for this deployment, so your order can be sent directly through WhatsApp instead. Nothing is marked paid until a valid payment is confirmed outside this website."}</p>
      {step === "delivery" && <div className="delivery-card"><h2>{form.businessName}</h2><p>{form.category} · {form.city}, {form.country}</p><p>{form.phone}</p><div className="button-row"><a className="button button-primary button-large" href={chat} target="_blank" rel="noreferrer">Send order on WhatsApp <ArrowRight /></a><button className="button button-ghost button-large" type="button" onClick={() => setStep("payment")}>I’ve sent my details</button></div><small>Use the pre-filled message so your business information is included.</small></div>}
      {step === "payment" && <div className="payment-card"><span>Starter Website</span><div className="payment-price"><strong>${siteConfig.starterPriceUsd}</strong><small>one-time starter payment</small></div>{siteConfig.paymentUrl ? <a className="button button-primary button-large button-full" href={siteConfig.paymentUrl} target="_blank" rel="noreferrer">Open secure checkout <ArrowRight /></a> : <div className="config-notice"><strong>Payment link not configured</strong><p>The site owner needs to set <code>VITE_PAYMENT_URL</code> to a hosted, secure checkout before accepting live payments. No order has been marked paid.</p></div>}<small><Shield /> Payment details are entered on the provider’s secure hosted checkout, never on this website.</small></div>}
      <div className="complete-links"><Link to="/">Return home</Link><Link to="/#demos">Explore live demos</Link></div>
    </div></section></SiteLayout>;
  }

  return (
    <SiteLayout>
      <section className="order-header"><div className="container order-header-inner"><div><span className="eyebrow">Start your website</span><h1>Tell us about your business.</h1><p>Share the essentials below. You can review everything before it is sent.</p></div><aside><span>Starter Website</span><strong>${siteConfig.starterPriceUsd}</strong><p>One page · One revision<br />Mobile and desktop</p><a href="#order-form">Start the form ↓</a></aside></div></section>
      <section className="order-section"><div className="container order-layout"><form id="order-form" className="order-form" onSubmit={onSubmit} noValidate>
        <div className="form-section"><div className="form-section-title"><span>01</span><div><h2>Business information</h2><p>The essentials customers will see on your website.</p></div></div><div className="form-grid"><Field label="Business name" required error={errors.businessName}><input value={form.businessName} onChange={e => update("businessName", e.target.value)} placeholder="e.g. Ada Foods" aria-invalid={Boolean(errors.businessName)} /></Field><Field label="Business category" required error={errors.category}><input value={form.category} onChange={e => update("category", e.target.value)} placeholder="e.g. Restaurant, salon, consultant" aria-invalid={Boolean(errors.category)} /></Field><Field label="Country" required error={errors.country}><input value={form.country} onChange={e => update("country", e.target.value)} placeholder="e.g. Nigeria" aria-invalid={Boolean(errors.country)} /></Field><Field label="City" required error={errors.city}><input value={form.city} onChange={e => update("city", e.target.value)} placeholder="e.g. Lagos" aria-invalid={Boolean(errors.city)} /></Field><Field label="Phone / WhatsApp" required error={errors.phone}><input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Include your country code" aria-invalid={Boolean(errors.phone)} /></Field><Field label="Email" error={errors.email} hint="Optional"><input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} /></Field><Field label="Business address" hint="Optional"><input value={form.address} onChange={e => update("address", e.target.value)} placeholder="Street, area, landmark" /></Field><Field label="Google Maps link" error={errors.mapUrl} hint="Optional"><input type="url" value={form.mapUrl} onChange={e => update("mapUrl", e.target.value)} placeholder="https://maps.app.goo.gl/..." aria-invalid={Boolean(errors.mapUrl)} /></Field></div></div>
        <div className="form-section"><div className="form-section-title"><span>02</span><div><h2>Your business</h2><p>Plain language is perfect. We’ll shape it into website copy.</p></div></div><div className="form-stack"><Field label="What does your business do?" error={errors.description} hint={`${form.description.length}/1500`}><textarea value={form.description} maxLength={1500} onChange={e => update("description", e.target.value)} placeholder="Tell us what your business offers and who it helps." /></Field><Field label="What services or products do you offer?"><textarea value={form.services} onChange={e => update("services", e.target.value)} placeholder="List your main services, products, or packages." /></Field><Field label="What makes your business different?"><textarea value={form.differentiators} onChange={e => update("differentiators", e.target.value)} placeholder="Share what you want customers to know." /></Field><Field label="Opening hours" hint="Optional"><input value={form.openingHours} onChange={e => update("openingHours", e.target.value)} placeholder="e.g. Monday–Friday, 9am–5pm" /></Field></div></div>
        <div className="form-section"><div className="form-section-title"><span>03</span><div><h2>Website style</h2><p>Pick a direction. We’ll use the live demos as inspiration.</p></div></div><fieldset className="style-options"><legend>Preferred visual style</legend>{["Clean & Professional", "Modern & Bold", "Luxury", "Simple & Minimal"].map(style => <label key={style} className={form.style === style ? "selected" : ""}><input type="radio" name="style" value={style} checked={form.style === style} onChange={e => update("style", e.target.value)} /><span>{style}<small>{style === "Clean & Professional" ? "Trustworthy and clear" : style === "Modern & Bold" ? "Energetic and memorable" : style === "Luxury" ? "Refined and premium" : "Simple and focused"}</small></span><Check /></label>)}</fieldset></div>
        <div className="form-section"><div className="form-section-title"><span>04</span><div><h2>Links & assets</h2><p>Add anything that will help us build your website accurately.</p></div></div><div className="form-grid"><Field label="Facebook URL" error={errors.facebookUrl}><input type="url" value={form.facebookUrl} onChange={e => update("facebookUrl", e.target.value)} placeholder="https://facebook.com/yourbusiness" aria-invalid={Boolean(errors.facebookUrl)} /></Field><Field label="Instagram URL" error={errors.instagramUrl}><input type="url" value={form.instagramUrl} onChange={e => update("instagramUrl", e.target.value)} placeholder="https://instagram.com/yourbusiness" aria-invalid={Boolean(errors.instagramUrl)} /></Field><Field label="TikTok URL" error={errors.tiktokUrl}><input type="url" value={form.tiktokUrl} onChange={e => update("tiktokUrl", e.target.value)} placeholder="https://tiktok.com/@yourbusiness" aria-invalid={Boolean(errors.tiktokUrl)} /></Field><Field label="Other social link" error={errors.otherSocialUrl}><input type="url" value={form.otherSocialUrl} onChange={e => update("otherSocialUrl", e.target.value)} placeholder="https://..." aria-invalid={Boolean(errors.otherSocialUrl)} /></Field><Field label="Logo and photo links" hint="Paste public Google Drive, Dropbox, or image links. Upload support can be added with storage configuration." ><textarea value={form.assetLinks} onChange={e => update("assetLinks", e.target.value)} placeholder="One link per line. Only use files you have permission to share." /></Field><Field label="Anything else?" error={errors.notes} hint={`${form.notes.length}/1500`}><textarea value={form.notes} maxLength={1500} onChange={e => update("notes", e.target.value)} placeholder="Pages, sections, colours, launch date, accessibility needs, or other requests." /></Field></div></div>
        {submitError && <div className="submit-error" role="alert">{submitError}</div>}
        <div className="submit-row"><div><Shield /><span><strong>Your details stay private.</strong><small>They are used only to fulfil this website request.</small></span></div><button className="button button-primary button-large" disabled={submitting}>{submitting ? "Preparing order…" : "Review & continue"}<ArrowRight /></button></div>
      </form><aside className="order-summary"><div className="summary-sticky"><span className="eyebrow">Your starter website</span><h2>A professional presence, without the complexity.</h2><ul>{["Custom one-page design", "Services or product content", "WhatsApp and contact links", "Mobile and desktop layout", "Basic SEO", "One revision"].map(item => <li key={item}><Check />{item}</li>)}</ul><div className="summary-price"><span>Starting price<small>Configured currency equivalent</small></span><strong>${siteConfig.starterPriceUsd}</strong></div><p>${siteConfig.starterPriceUsd} ≈ ₦{siteConfig.starterPriceNaira.toLocaleString("en-NG")} is the current display reference for Nigeria.</p></div></aside></div></section>
    </SiteLayout>
  );
}
