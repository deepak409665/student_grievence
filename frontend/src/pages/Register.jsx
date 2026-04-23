import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const BASE_URL = "https://student-grievence.onrender.com";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BASE_URL}/api/register`,
        form
      );

      alert("Registered Successfully");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: "15px",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          Student Register
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px"
          }}
        >
          Already have account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;