import { useState } from "react";

const initialValues = { name: "", phone: "", email: "", message: "" };

export function ProjectForm({
  className = "contact-form",
  title = "Your details",
  floatingLabels = false,
}) {
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
    <form
      className={`${className}${floatingLabels ? " contact-form--floating" : ""}`}
      onSubmit={submit}
    >
      <h2 id="contact-form-title">{title}</h2>
      <label>
        <input
          name="name"
          value={values.name}
          onChange={update}
          required
          autoComplete="name"
          placeholder={floatingLabels ? " " : undefined}
        />
        <span>Name</span>
      </label>
      <label>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update}
          required
          autoComplete="tel"
          placeholder={floatingLabels ? " " : undefined}
        />
        <span>Phone number</span>
      </label>
      <label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={update}
          required
          autoComplete="email"
          placeholder={floatingLabels ? " " : "you@company.com"}
        />
        <span>Work email</span>
      </label>
      <label>
        <textarea
          name="message"
          value={values.message}
          onChange={update}
          rows="5"
          placeholder={
            floatingLabels ? " " : "Tell us a little about your project"
          }
        />
        <span>How can we help?</span>
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
        <p>Tell us your idea. Let’s make it happen.</p>
      </section>
      <section
        className="contact-page__body"
        aria-labelledby="contact-form-title"
      >
        <div className="contact-page__details">
          <p className="kicker">Free consultation</p>
          <h2>Let’s make the next move clear.</h2>
          <p>Share a few details. We’ll take it from there.</p>
          <a href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a>
        </div>
        <ProjectForm />
      </section>
    </main>
  );
}
