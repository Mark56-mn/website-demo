import DemoShell from "../../components/DemoShell";
import { Check, MapPin, Star } from "../../components/Icons";

const services = [
  ["01", "Home cleaning", "A careful, reliable clean for everyday homes, busy families, and everything in between."],
  ["02", "Office cleaning", "Keep your workplace fresh and presentable with a simple recurring cleaning plan."],
  ["03", "Move in / out", "Make moving easier with a detailed clean for handover, arrival, or renewal."],
  ["04", "Deep cleaning", "Extra time and attention for the overlooked corners, fixtures, and surfaces."],
];

export default function CleaningDemo() {
  return <DemoShell name="SparklePro" eyebrow="A fresher home starts here" description="Friendly, detail-minded cleaning for homes, offices, and fresh beginnings. This fictional business demonstrates a service-focused website." image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85" color="#176b57" whatsappText="Hello SparklePro demonstration! I would like to ask about your cleaning services." heroTitle={<>A spotless space.<br /><em>A clearer day.</em></>}>
    <section className="demo-section" id="services"><div className="container"><div className="demo-section-head"><span>What we do</span><h2>Care in every corner.</h2><p>A simple menu of dependable cleaning options. Final service descriptions and availability would be set by the real business.</p></div><div className="service-grid">{services.map(([num, title, copy]) => <article key={title}><span>{num}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">Enquire <span>→</span></a></article>)}</div></div></section>
    <section className="demo-section demo-about" id="about"><div className="container demo-about-grid"><div className="demo-about-image"><img loading="lazy" src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80" alt="Cleaning professional demonstrating a fictional service" /><span>Thoughtful service, from start to finish.</span></div><div><span className="demo-label">Why SparklePro</span><h2>Less mess.<br />More time for life.</h2><p>This fictional brand represents a practical local cleaning company: clear services, friendly communication, and an easy path to request a quote.</p><ul>{["Clear scope before work begins", "Careful attention to detail", "Simple scheduling by WhatsApp"].map(item => <li key={item}><Check />{item}</li>)}</ul></div></div></section>
    <section className="demo-section quote-section"><div className="container"><span>Sample customer feedback</span><blockquote>“The website is refreshingly easy to use. I could see exactly what was included and request a quote in a few taps.”</blockquote><div className="sample-review"><div className="sample-avatar">AK</div><div><strong>Sample customer profile</strong><small><Star /> <Star /> <Star /> <Star /> <Star /> Illustrative review</small></div></div><p className="demo-disclaimer">This testimonial is placeholder content for a fictional demonstration and is not a real customer claim.</p></div></section>
    <section className="demo-section contact-strip" id="contact"><div className="container"><div><span className="demo-label">Service areas</span><h2>Cleaning services across your neighbourhood.</h2><p><MapPin /> Demonstration location: Central Lagos and nearby areas. A real business would list its exact coverage here.</p></div><a className="demo-big-button" href="#contact">Request a cleaning quote →</a></div></section>
  </DemoShell>;
}
