import "./Footer.css";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <p className="footer-copy">©Nova 2024. All rights reserved</p>

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
