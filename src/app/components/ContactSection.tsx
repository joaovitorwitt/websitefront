import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="get-in-touch" id="contact">
      <div className="container">
        <div className="section-title-container">
          <h2 className="title section-title">Get</h2>
          <div className="section-subtitle-container">
            <span className="subtitle-number has-sparkles">03</span>
            <h5 className="title section-subtitle">in contact</h5>
          </div>
        </div>

        <div className="section-description d-grid">
          <div className="scroll-reveal-left">
            <p className="description">
              Let's work on something{" "}
              <span className="text-bold">interesting</span>
            </p>
          </div>
        </div>

        <div className="form-container">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
