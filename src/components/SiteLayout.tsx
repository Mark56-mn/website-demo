import { useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { whatsappUrl } from "../config";
import { ArrowUpRight, Menu, X } from "./Icons";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.5 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.5-8.3Zm-8.4 18.3h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.3c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.9-9.3 9.9Zm5.4-7.4c-.3-.1-1.7-.8-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.1-.7-.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1a11.3 11.3 0 0 0 4.3 3.8c2 .8 2.4.7 2.8.6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" />
  </svg>
);

export default function SiteLayout({ children, theme = "business" }: { children: ReactNode; theme?: "business" | "demo" }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const chat = whatsappUrl("Hello! I'd like to talk about a business website.");

  const close = () => setOpen(false);
  return (
    <div className={theme === "demo" ? "site demo-theme" : "site"}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" onClick={close} aria-label="Website Demo home">
            <span className="brand-mark">W</span><span>Website<span className="brand-accent">Demo</span></span>
          </Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X /> : <Menu />}
          </button>
          <nav id="primary-navigation" className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
            <NavLink to="/" onClick={close}>Home</NavLink>
            <NavLink to="/#demos" onClick={close}>Live demos</NavLink>
            <NavLink to="/#how-it-works" onClick={close}>How it works</NavLink>
            <NavLink to="/#pricing" onClick={close}>Pricing</NavLink>
            <NavLink to="/order" onClick={close} className="nav-mobile-order">Start your site</NavLink>
          </nav>
          <Link className="button button-small button-primary nav-cta" to="/order">Build my website <ArrowUpRight /></Link>
        </div>
      </header>
      {open && <button className="nav-scrim" aria-label="Close navigation" onClick={close} />}
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand brand-light"><span className="brand-mark">W</span><span>Website<span className="brand-accent">Demo</span></span></Link>
            <p>Professional business websites, thoughtfully made and ready to grow with you.</p>
          </div>
          <div><h3>Explore</h3><Link to="/#demos">Live demos</Link><Link to="/#pricing">Pricing</Link><Link to="/order">Start an order</Link></div>
          <div><h3>Demos</h3><Link to="/demos/cleaning">Cleaning business</Link><Link to="/demos/fashion">Fashion brand</Link><Link to="/demos/real-estate">Real estate</Link></div>
          <div><h3>Contact</h3>{chat ? <a href={chat} target="_blank" rel="noreferrer">Chat on WhatsApp</a> : <span>WhatsApp setup required</span>}<span>Mon–Sat, 9am–6pm</span><Link to="/admin/login">Admin login</Link></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Website Demo</span><span>Built mobile-first for busy business owners.</span></div>
      </footer>
      {chat && location.pathname === "/" && <a className="floating-whatsapp" href={chat} target="_blank" rel="noreferrer" aria-label="Chat with Website Demo on WhatsApp"><WhatsAppIcon /><span>Chat with us</span></a>}
    </div>
  );
}
