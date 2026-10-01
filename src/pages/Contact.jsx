import { useState } from "react";

const initialValues = { name: "", phone: "", email: "", message: "" };

export function ProjectForm({ className = "contact-form", title = "Your details" }) {
  const [values, setValues] = useState(initialValues);
  const update = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\n\nProject details:\n${values.message}`,
    );
    window.location.href = `mailto:hr@dealatecorp.com?subject=${subject}&body=${body}`;
  };
  return (
    <form className={className} onSubmit={submit}>
          <h2 id="contact-form-title">{title}</h2>
          <label>
            Name
            <input
              name="name"
              value={values.name}
              onChange={update}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              value={values.phone}
              onChange={update}
              required
              autoComplete="tel"
            />
          </label>
          <label>
            Work email
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
          <label>
            How can we help?
            <textarea
              name="message"
              value={values.message}
              onChange={update}
              rows="5"
              placeholder="Tell us a little about your project"
            />
          </label>
          <button className="button contact-form__submit" type="submit">
            Send enquiry <span aria-hidden="true">↗</span>
          </button>
    </form>
  );
}

export function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-page__hero">
        <p className="kicker">Contact Dealatecorp</p>
        <h1>Start your project.</h1>
        <p>
          Tell us what you want to build or improve. We’ll review the details
          and get back to you shortly.
        </p>
      </section>
      <section
        className="contact-page__body"
        aria-labelledby="contact-form-title"
      >
        <div className="contact-page__details">
          <p className="kicker">Free consultation</p>
          <h2>Let’s make the next move clear.</h2>
          <p>
            Share the essentials. A member of our team will follow up to discuss
            the most useful next step.
          </p>
          <a href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a>
        </div>
        <ProjectForm />
      </section>
    </main>
  );
}
