import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services.js";

export default function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="section-heading reveal"><div><p className="eyebrow"><span className="eyebrow-line" /> WHAT I BRING TO THE FRAME</p><h2>Ways of <em>making</em></h2></div><p className="section-aside">Small studio. Big-picture thinking.<br />Built around the project, not the process.</p></div>
      <div className="service-list">
        {services.map(([number, name, description]) => (
          <div className="service-row reveal" key={number}><span className="service-number mono">{number}</span><h3>{name}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={18} /></div>
        ))}
      </div>
      <div className="service-foot mono">FROM FIRST THOUGHT TO FINAL FRAME <span>↘</span></div>
    </section>
  );
}
