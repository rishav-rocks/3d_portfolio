import "./ContactModal.css";
import { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import gsap from "gsap";

const ContactModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const formGroupsRef = useRef([]);

  // Animate form groups staggered on open
  useEffect(() => {
    if (isOpen && formGroupsRef.current.length > 0) {
      gsap.fromTo(
        formGroupsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        },
      );
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close on overlay click (not modal itself)
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const addFormRef = (el) => {
    if (el && !formGroupsRef.current.includes(el)) {
      formGroupsRef.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Flash the button
    const btn = e.target.querySelector(".contact-submit");
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
    // You can add form submission logic here (e.g., emailjs, formspree)
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div
      ref={overlayRef}
      className={`contact-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="contact-modal">
        {/* Glow orbs */}
        <div className="modal-glow modal-glow-1" />
        <div className="modal-glow modal-glow-2" />

        {/* Floating particles */}
        <div className="modal-particle" style={{ top: "15%", left: "10%" }} />
        <div className="modal-particle" style={{ top: "60%", right: "12%" }} />
        <div
          className="modal-particle"
          style={{ bottom: "20%", left: "30%" }}
        />

        {/* Close button */}
        <button className="contact-modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <p className="contact-modal-subtitle">Connect with me</p>
        <h2 className="contact-modal-title">
          Let's <b>build</b> something <b>great</b>.
        </h2>

        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group" ref={addFormRef} style={{ opacity: 0 }}>
            <label>Your Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group" ref={addFormRef} style={{ opacity: 0 }}>
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group" ref={addFormRef} style={{ opacity: 0 }}>
            <label>Subject</label>
            <input
              type="text"
              className="form-input"
              placeholder="Project collaboration"
            />
          </div>

          <div className="form-group" ref={addFormRef} style={{ opacity: 0 }}>
            <label>Message</label>
            <textarea
              className="form-textarea"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <div ref={addFormRef} style={{ opacity: 0 }}>
            <button type="submit" className="contact-submit">
              <span>Send Message</span>
            </button>
          </div>
        </form>

        {/* Divider */}
        <div
          className="contact-divider"
          ref={addFormRef}
          style={{ opacity: 0 }}
        >
          <div className="contact-divider-line" />
          <span className="contact-divider-text">Or reach out directly</span>
          <div className="contact-divider-line" />
        </div>

        {/* Social icons */}
        <div
          className="contact-socials"
          ref={addFormRef}
          style={{ opacity: 0 }}
        >
          <a
            href="mailto:rishavrocks87@gmail.com"
            className="contact-social-icon"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="tel:+918617421281"
            className="contact-social-icon"
            title="Call"
          >
            <FaPhone />
          </a>
          <a
            href="https://github.com/rishav-rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon"
            title="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
