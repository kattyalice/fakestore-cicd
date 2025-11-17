import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="navbar-nav">
        <Link className="nav-link" to="/cart">Cart</Link>

        {user ? (
          <div key="auth-logged-in" className="d-flex">
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/logout">Logout</Link>
          </div>
        ) : (
          <div key="auth-logged-out" className="d-flex">
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;