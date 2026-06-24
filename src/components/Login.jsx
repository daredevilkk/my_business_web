import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [type, setType] = useState("old");

  const [login, setLogin] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (type === "old") {
      const response = await fetch(
        "https://my-business-backend-1z8e.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await fetch(
        "https://my-business-backend-1z8e.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: login,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully");
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>Customer Login</h1>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="old">Old User</option>
          <option value="new">New User</option>
        </select>

        <input
          type="text"
          placeholder="User ID"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        {type === "new" && (
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "new" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
        )}

        <button
          className="login-btn"
          onClick={handleSubmit}
        >
          {type === "old" ? "Login" : "Register"}
        </button>

      </div>
    </div>
  );
}

export default Login;