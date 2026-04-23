import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [grievances, setGrievances] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchGrievances();
    }
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/grievances",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setGrievances(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        "http://localhost:5000/api/grievances",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Grievance Submitted");

      setForm({
        title: "",
        description: "",
        category: ""
      });

      fetchGrievances();

    } catch (error) {
      alert(
        error.response?.data?.message || "Submission Failed"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteGrievance = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/grievances/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Deleted Successfully");
      fetchGrievances();

    } catch (error) {
      alert("Delete Failed");
    }
  };

  const searchGrievance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/grievances/search?title=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setGrievances(res.data);

    } catch (error) {
      alert("Search Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "10px"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "30px"
      }}
    >
      <div
        style={{
          maxWidth: "750px",
          margin: "auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1 style={{ margin: 0 }}>Dashboard</h1>

          <button
            onClick={logout}
            style={{
              ...buttonStyle,
              backgroundColor: "#ef4444",
              color: "white"
            }}
          >
            Logout
          </button>
        </div>

        <hr style={{ margin: "25px 0" }} />

        <h2>Submit Grievance</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            name="title"
            placeholder="Enter Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="description"
            placeholder="Enter Description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            style={inputStyle}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: "#2563eb",
              color: "white",
              marginTop: "15px"
            }}
          >
            Submit
          </button>
        </form>

        <hr style={{ margin: "30px 0" }} />

        <h2>Search Grievance</h2>

        <input
          style={inputStyle}
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={searchGrievance}
            style={{
              ...buttonStyle,
              backgroundColor: "#10b981",
              color: "white"
            }}
          >
            Search
          </button>

          <button
            onClick={fetchGrievances}
            style={{
              ...buttonStyle,
              backgroundColor: "#6b7280",
              color: "white"
            }}
          >
            Reset
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        <h2>My Grievances</h2>

        {grievances.length === 0 ? (
          <p>No grievances found.</p>
        ) : (
          grievances.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #e5e7eb",
                padding: "18px",
                borderRadius: "10px",
                marginTop: "15px",
                backgroundColor: "#fafafa"
              }}
            >
              <h3 style={{ marginTop: 0 }}>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Status:</strong> {item.status}</p>

              <button
                onClick={() => deleteGrievance(item._id)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#dc2626",
                  color: "white",
                  marginTop: "10px"
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;