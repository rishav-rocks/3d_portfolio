import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/rishav-rocks", icon: <FaGithub /> },
  { href: "https://www.linkedin.com/in/rishavkarmakar/", icon: <FaLinkedin /> },
  { href: "https://twitter.com/", icon: <FaTwitter /> },
  { href: "mailto:rishavrocks87@gmail.com", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <p className="footer-copy">©Rishav 2026. All rights reserved</p>

        <div className="footer-socials">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a href="#privacy-policy" className="footer-policy">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
