import { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;


function AdminLogin() {
  
  const [password, setPassword] = useState("");
  const [userName, setUsername]= useState("");
  const navigate = useNavigate();
  const login = () => {
  if (password === ADMIN_PASSWORD && userName === ADMIN_USERNAME) {
    localStorage.setItem("isAdmin", "true");
    navigate("/admin");
  } else {
    alert("Wrong Password or username");
  }
  
};
return (
  <div className="admin-login-page">

    <div className="login-card">

      <div className="logo-text">
        PM INFINITY TABLES
      </div>

      <h1>Admin Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="login-btn"
        onClick={login}
      >
        Login
      </button>

      <button
        className="home-btn"
        onClick={() => navigate("/")}
      >
        Back To Home
      </button>

    </div>

  </div>
);
  
}

export default AdminLogin;