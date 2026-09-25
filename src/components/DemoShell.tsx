import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../config";
import { setPageMeta } from "../lib/seo";
import { ArrowUpRight, MapPin } from "./Icons";

type DemoShellProps = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  color: string;
  whatsappText: string;
  heroTitle: ReactNode;
  children: ReactNode;
  floatingLabel?: string;
};

export default function DemoShell({ name, eyebrow, description, image, color, whatsappText, heroTitle, children, floatingLabel = "WhatsApp demo" }: DemoShellProps) {
  useEffect(() => {
    setPageMeta(`${name} — Website Demo showcase`, `${description} This is a fictional demonstration website created by Website Demo.`);
  }, [name, description]);
  const chat = whatsappUrl(whatsappText);
  return (
    <div className="demo-business" style={{ "--demo": color } as CSSProperties}>
      <div className="demo-notice"><span>Fictional business demonstration</span><Link to="/">← Back to Website Demo</Link></div>
      <header className="demo-header">
        <div className="container demo-nav">
          <a href="#top" className="demo-logo">{name}</a>
          <nav aria-label={`${name} navigation`}><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
          <a className="demo-header-cta" href="#contact">Work with us <ArrowUpRight /></a>
        </div>
      </header>
      <main id="top">
        <section className="demo-hero">
          <div className="container demo-hero-grid">
            <div className="demo-hero-copy">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{heroTitle}</h1>
              <p>{description}</p>
              <div className="button-row"><a className="button button-primary" href="#services">Explore our services <ArrowUpRight /></a><a className="button button-ghost" href="#contact">Get in touch</a></div>
              <span className="demo-location"><MapPin /> Serving local homes and businesses</span>
            </div>
            <div className="demo-hero-image"><img src={image} alt={`${name} demonstration project`} /><div className="demo-image-note"><span>Website concept</span><strong>Made for local business</strong></div></div>
          </div>
        </section>
        <section className="demo-content">{children}</section>
      </main>
      {chat && <a className="demo-float" href={chat} target="_blank" rel="noreferrer" aria-label={floatingLabel}>WhatsApp <span>Ask us</span></a>}
    </div>
  );
}
