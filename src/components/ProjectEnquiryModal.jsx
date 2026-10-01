import { useEffect, useRef } from "react";
import { ProjectForm } from "../pages/Contact.jsx";

export function ProjectEnquiryModal({ open, onClose }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("project-enquiry-open");
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => dialog.current?.focus());
    return () => {
      document.body.classList.remove("project-enquiry-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="project-enquiry-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialog}
        className="project-enquiry-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-enquiry-title"
        tabIndex="-1"
      >
        <div className="project-enquiry-modal__intro">
          <p className="kicker">Dealatecorp / New project</p>
          <h2 id="project-enquiry-title">Let’s make the next move clear.</h2>
          <p>
            Tell us what you need. We’ll review the brief and follow up with a
            useful next step.
          </p>
          <a href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a>
        </div>
        <div className="project-enquiry-modal__form-wrap">
          <button
            className="project-enquiry-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close project enquiry form"
          >
            ×
          </button>
          <ProjectForm
            className="contact-form project-enquiry-modal__form"
            title="Your details"
          />
        </div>
      </section>
    </div>
  );
}
