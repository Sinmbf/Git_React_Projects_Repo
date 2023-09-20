import PropTypes from "prop-types";
const Footer = ({ styleTheme }) => {
  return (
    <footer className="py-3" style={styleTheme}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-light">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-light">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-light">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-light">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-light">
            About
          </a>
        </li>
      </ul>
      <p className="text-center text-light">© 2023 Company, Inc</p>
    </footer>
  );
};

Footer.propTypes = {
  styleTheme: PropTypes.object,
};

export default Footer;
