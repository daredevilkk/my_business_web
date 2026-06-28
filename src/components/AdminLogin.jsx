import { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const API_URL =
  import.meta.env.VITE_API_URL || "https://my-business-backend-1z8e.onrender.com";

function AdminLogin() {
  
  const [password, setPassword] = useState("");
  const [userName, setUsername]= useState("");
  const navigate = useNavigate();
  const login = async () => {
  if (!userName.trim() || !password.trim()) {
    alert("Please enter username and password");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName.trim(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.message || "Wrong password or username");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    navigate("/admin");
  } catch (error) {
    console.log(error);
    alert("Unable to login. Please try again.");
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