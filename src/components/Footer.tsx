import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h2 className="footer-title">Restaurant Name</h2>
          <p className="footer-text">123 Foodie Lane, Flavor Town, USA</p>
          <p className="footer-text">Phone: (123) 456-7890</p>
          <p className="footer-text">Email: contact@restaurant.com</p>
        </div>
        <div className="footer-links">
          <a href="/about" className="footer-link">
            About Us
          </a>
          <a href="/menu" className="footer-link">
            Menu
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Restaurant Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
