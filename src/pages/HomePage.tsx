import { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "../components/Icons";
import { siteConfig, whatsappUrl } from "../config";
import { setPageMeta } from "../lib/seo";

const demos = [
  { to: "/demos/cleaning", name: "SparklePro Cleaning", type: "Local service business", copy: "A clean, trustworthy design for a residential and commercial cleaning brand.", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80", tone: "mint" },
  { to: "/demos/fashion", name: "Zuri Fashion", type: "Fashion & retail brand", copy: "An image-first storefront designed to showcase collections and drive WhatsApp orders.", image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1000&q=80", tone: "sand" },
  { to: "/demos/real-estate", name: "PrimeNest Properties", type: "Property & real estate", copy: "A premium property experience focused on listings, details, location, and enquiries.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80", tone: "navy" },
];

const included = ["Professional one-page design", "Services or product showcase", "Click-to-call and WhatsApp", "Social media and location links", "Mobile-friendly layout", "Basic SEO setup", "Fast delivery", "One revision included"];

const steps = [
  ["01", "Choose your style", "Explore the live demos and pick the direction that feels right for your business."],
  ["02", "Send your details", "Share your business information, services, goals, and any useful links."],
  ["03", "Make payment", "Complete the secure $20 starter payment using the configured checkout."],
  ["04", "Receive your website", "Review the finished mobile and desktop version, request one revision, and go live."],
];

const faqs = [
  ["What does the $20 website include?", "You get a professional one-page website with your business information, services or products, contact details, WhatsApp, social links, location, basic SEO, and one revision."],
  ["How quickly will I receive my website?", "Delivery time depends on the information and content you provide. The exact timing is confirmed after your order is received."],
  ["Do I need to provide my own images?", "No, but original business photos help the final site feel authentic. You can also provide links to images you own or have permission to use."],
  ["Can I use my own domain?", "The starter package covers the provided hosting URL. Domain connection can be discussed as an optional upgrade."],
  ["Can you build an online store?", "Not in the $20 starter package. Larger catalogs, online payments, bookings, and other advanced functionality are possible as separately scoped upgrades."],
  ["Can I request changes?", "Yes. One round of reasonable revisions is included so we can correct details and improve the final presentation."],
  ["How does payment work?", "After you submit the order form, use the configured secure checkout link. The site never marks an order paid from a client-side button."],
  ["Do you work with businesses outside Nigeria?", "Yes. The starter price is shown in US dollars, with a configurable Naira presentation for Nigerian customers. International businesses are welcome."],
];

export default function HomePage() {
  useEffect(() => setPageMeta("Website Demo — Get Your Business Online for $20", "Professional, mobile-friendly websites for small businesses, entrepreneurs and brands, starting at $20."), []);
  const chat = whatsappUrl("Hello! I'd like to ask about the $20 business website.");
  return (
    <SiteLayout>
      <section className="hero home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><Sparkles /><span>Professional websites. Straightforward pricing.</span></div>
            <h1>Your business deserves to be <em>online.</em></h1>
            <p className="hero-lede">Get a professional, mobile-friendly business website starting at <strong>${siteConfig.starterPriceUsd}</strong>. Built to impress customers and make contacting you easier.</p>
            <div className="button-row hero-actions">
              <Link className="button button-primary button-large" to="/order">Build my website <ArrowRight /></Link>
              <a className="button button-ghost button-large" href="#demos">See live examples</a>
            </div>
            <div className="hero-proof"><span className="avatar-stack"><i>SP</i><i>ZF</i><i>PN</i></span><span><strong>3 interactive demos</strong><small>Open and explore them yourself</small></span></div>
          </div>
          <div className="hero-visual" aria-label="Preview of a professional business website">
            <div className="browser-card">
              <div className="browser-top"><i /><i /><i /><span>yourbusiness.com</span></div>
              <div className="mini-site-nav"><strong>BRAND</strong><span>About &nbsp; Services &nbsp; Contact</span></div>
              <div className="mini-site-hero">
                <small>LOCAL BUSINESS WEBSITE</small><strong>Quality service.<br />Friendly faces.</strong><p>Everything your customers need, right where they need it.</p><span>Get in touch →</span>
              </div>
              <div className="mini-site-cards"><i /><i /><i /></div>
            </div>
            <div className="floating-price"><small>Starter website</small><strong>${siteConfig.starterPriceUsd}</strong><span>One revision included</span></div>
            <div className="floating-mobile"><div className="phone-notch" /><small>Your business</small><strong>Now online.</strong><span>Call &nbsp; WhatsApp</span></div>
          </div>
        </div>
        <div className="container trust-strip"><span><Check /> Mobile-first design</span><span><Check /> Secure checkout</span><span><Check /> No complicated subscriptions</span></div>
      </section>

      <section className="section demos-section" id="demos">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow">Explore before you order</span><h2>Real demos. Not screenshots.</h2></div><p>Open each website and explore the layout, content, and mobile experience. Every business shown is fictional and created as a portfolio demonstration.</p></div>
          <div className="demo-card-grid">
            {demos.map((demo, index) => (
              <article className={`showcase-card ${demo.tone}`} key={demo.name}>
                <Link to={demo.to} className="showcase-image" aria-label={`Open the ${demo.name} interactive demo`}><img src={demo.image} alt={`${demo.name} website demonstration`} loading="lazy" /><span className="demo-number">0{index + 1}</span><span className="open-demo">Open demo <ArrowUpRight /></span></Link>
                <div className="showcase-body"><span>{demo.type}</span><h3>{demo.name}</h3><p>{demo.copy}</p><Link to={demo.to}>Explore this website <ArrowRight /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section included-section">
        <div className="container included-grid">
          <div className="included-copy"><span className="eyebrow">The starter package</span><h2>Everything essential.<br />Nothing you don’t need.</h2><p>A focused website package for small businesses ready to look credible, reachable, and easy to buy from.</p><Link className="text-link" to="/order">Start your website <ArrowRight /></Link></div>
          <div className="included-card">
            <div className="included-card-head"><div><span>Starter Website</span><h3>Your business, online.</h3></div><strong>${siteConfig.starterPriceUsd}</strong></div>
            <ul>{included.map((item) => <li key={item}><span><Check /></span>{item}</li>)}</ul>
            <Link className="button button-primary button-full" to="/order">Build my website <ArrowRight /></Link>
            <p className="fine-print">One-page website · One revision · Advanced features quoted separately</p>
          </div>
        </div>
      </section>

      <section className="section process-section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">Simple from start to finish</span><h2>Four steps to launch</h2><p>No confusing sales process. Just send the information we need and follow the clear path to your new website.</p></div>
          <div className="process-grid">{steps.map(([number, title, copy]) => <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
        </div>
      </section>

      <section className="section upgrades-section" id="upgrades">
        <div className="container upgrades-panel">
          <div><span className="eyebrow">Need more later?</span><h2>Start simple. Grow when you’re ready.</h2><p>The $20 package stays focused. When your business needs more, these upgrades can be scoped separately without pretending they are included today.</p></div>
          <div className="upgrade-list"><span>Product catalogue</span><span>Online store</span><span>Booking system</span><span>Lead collection</span><span>Automation</span><span>Custom domain</span></div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="container pricing-panel">
          <div><span className="eyebrow">Simple starting price</span><h2>Your business online from <strong>${siteConfig.starterPriceUsd}</strong></h2><p>Also displayed as ₦{siteConfig.starterPriceNaira.toLocaleString("en-NG")} for Nigeria. The local equivalent is configuration-based and can be adjusted.</p></div>
          <div className="pricing-action"><Link className="button button-light button-large" to="/order">Build my website <ArrowRight /></Link><small>Secure payment link configured by the site owner.</small></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid"><div><span className="eyebrow">Good to know</span><h2>Questions, answered.</h2><p>Need something specific? Send your question and we’ll confirm what is possible before you order.</p>{chat ? <a className="text-link" href={chat}>Ask on WhatsApp <ArrowUpRight /></a> : <Link className="text-link" to="/order">Send your question <ArrowRight /></Link>}</div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="container final-cta-inner"><span className="eyebrow">Ready when you are</span><h2>Put your business on the map—<br />starting with a strong first impression.</h2><p>Send your business details today. We’ll shape them into a clear, professional mobile website.</p><div className="button-row"><Link className="button button-light button-large" to="/order">Build my website <ArrowRight /></Link>{chat && <a className="button button-outline-light button-large" href={chat} target="_blank" rel="noreferrer">Contact on WhatsApp</a>}</div></div></section>
    </SiteLayout>
  );
}
