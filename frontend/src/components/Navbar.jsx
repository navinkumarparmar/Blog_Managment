import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">FLWK Blog</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/blogs">All Blogs</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/my-blogs">My Blogs</Link></li>
        </ul>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
