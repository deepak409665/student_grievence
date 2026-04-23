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

  const BASE_URL = "https://student-grievence.onrender.com";

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
        `${BASE_URL}/api/grievances`,
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
        `${BASE_URL}/api/grievances`,
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
      alert(error.response?.data?.message || "Submission Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteGrievance = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/grievances/${id}`,
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
        `${BASE_URL}/api/grievances/search?title=${search}`,
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
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "30px" }}>
      <div style={{
        maxWidth: "750px",
        margin: "auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "14px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Dashboard</h1>
          <button onClick={logout} style={{ ...buttonStyle, background: "red", color: "white" }}>
            Logout
          </button>
        </div>

        <hr />

        <h2>Submit Grievance</h2>

        <form onSubmit={handleSubmit}>
          <input style={inputStyle} name="title" placeholder="Enter Title" value={form.title} onChange={handleChange} />
          <input style={inputStyle} name="description" placeholder="Enter Description" value={form.description} onChange={handleChange} />

          <select style={inputStyle} name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" style={{ ...buttonStyle, background: "#2563eb", color: "white", marginTop: "10px" }}>
            Submit
          </button>
        </form>

        <hr />

        <input style={inputStyle} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <button onClick={searchGrievance} style={{ ...buttonStyle, background: "green", color: "white" }}>
          Search
        </button>

        <button onClick={fetchGrievances} style={{ ...buttonStyle, background: "gray", color: "white" }}>
          Reset
        </button>

        <hr />

        <h2>My Grievances</h2>

        {grievances.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>{item.status}</p>

            <button onClick={() => deleteGrievance(item._id)} style={{ background: "red", color: "white" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;