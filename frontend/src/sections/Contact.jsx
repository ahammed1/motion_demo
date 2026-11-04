import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    setSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/enquiries`, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your enquiry could not be sent.");
      setFormStatus("Thanks — your project note is on its way. I'll be in touch soon.");
      formRef.current.reset();
    } catch (error) {
      setFormStatus(error.message || "Unable to send right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-heading reveal"><p className="eyebrow"><span className="eyebrow-line" /> HAVE A GOOD ONE IN MIND?</p><h2>Let's make<br />it <em>move.</em></h2><p>Tell me a little about what you're imagining.<br />The rough idea is the best place to start.</p></div>
      <form className="enquiry-form reveal" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>YOUR NAME<input name="name" autoComplete="name" placeholder="How should I call you?" required maxLength="120" /></label>
          <label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" required maxLength="254" /></label>
          <label>COMPANY <span className="optional">(OPTIONAL)</span><input name="company" autoComplete="organization" placeholder="The good people you're with" maxLength="160" /></label>
          <label>WHAT DO YOU NEED?<select name="service" defaultValue="" required><option value="" disabled>Choose your starting point</option><option>3D Motion Design</option><option>Product Animation</option><option>CGI Advertising</option><option>Brand Animation</option><option>Visual Effects</option><option>Creative Direction</option><option>Something else entirely</option></select></label>
          <label className="full-field">THE PROJECT<textarea name="description" placeholder="The exciting bit, the tricky bit, and anything else on your mind..." rows="3" required maxLength="5000" /></label>
          <label>ESTIMATED BUDGET<select name="budget" defaultValue=""><option value="" disabled>Just a rough range</option><option>Under $5,000</option><option>$5,000 – $10,000</option><option>$10,000 – $25,000</option><option>$25,000 – $50,000</option><option>$50,000+</option><option>Let's figure it out</option></select></label>
          <label>IDEAL TIMELINE<input name="deadline" type="date" /></label>
          <label className="full-field file-field">ANYTHING TO SHOW ME? <span className="optional">(OPTIONAL · MAX 10MB EACH)</span><input name="references" type="file" accept="image/*,.pdf,.mp4,.mov" multiple /><span className="file-hint">Attach reference images, a brief, or a very early sketch.</span></label>
        </div>
        <div className="form-submit"><p className="form-status" role="status">{formStatus}</p><button className="button button-primary magnetic" type="submit" disabled={submitting}>{submitting ? "SENDING..." : "SEND THE FIRST NOTE"} <ArrowUpRight size={15} /></button></div>
        <p className="privacy-note">Your details stay between us. No newsletters, no nonsense.</p>
      </form>
    </section>
  );
}
