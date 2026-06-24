import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
  <div className="logo">
    PM Infinity Tables
  </div>

  <ul className="nav-links">
    <li><Link to="/">HOME</Link></li>
    <li><Link to="/store">STORE</Link></li>
    <li><Link to="/orders">ORDERS</Link></li>
    <li><Link to="/help">HELP</Link></li>
    <li><Link to="/admin">ADMIN</Link></li>
  </ul>

  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    Back
  </button>
</nav>
  );
}

export default Navbar;