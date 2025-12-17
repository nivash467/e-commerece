import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser, loadCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle login button click
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // save token to localStorage
        localStorage.setItem("token", data.token);
        
        // update user state in App
        setUser({ token: data.token });
        
        // load user's cart
        loadCart();

        alert("Login successful!");
        navigate("/products");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <br /><br />

      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}