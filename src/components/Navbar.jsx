import "./Navbar.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
  <div className="logo">
    PM Infinity Tables
  </div>
  <button
  className="hamburger"
  onClick={() => setOpen(!open)}
>
  {open ? "✕" : "☰"}
</button>

  <ul className={`nav-links ${open ? "show" : ""}`}>
    <li><Link to="/" onClick={() => setOpen(false)}>HOME</Link></li>
<li><Link to="/store" onClick={() => setOpen(false)}>STORE</Link></li>
{!localStorage.getItem("userId") && (
  <li><Link to="/login">LOGIN</Link></li>
)}
<li><Link to="/orders" onClick={() => setOpen(false)}>ORDERS</Link></li>
<li><Link to="/help" onClick={() => setOpen(false)}>HELP</Link></li>
<li><Link to="/admin" onClick={() => setOpen(false)}>ADMIN</Link></li>
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