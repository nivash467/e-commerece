import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://16.16.67.21:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Registered successfully");
      navigate("/login");
    } else {
      alert("Register failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
