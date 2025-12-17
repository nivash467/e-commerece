import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav style={{ background: "#333", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Link to="/" style={{ color: "white", margin: "10px" }}>Home</Link>
        <Link to="/products" style={{ color: "white", margin: "10px" }}>Products</Link>
        <Link to="/contact" style={{ color: "white", margin: "10px" }}>Contact</Link>
        <Link to="/cart" style={{ color: "white", margin: "10px" }}>
          Cart ({cartCount})
        </Link>
      </div>
      <div>
        {user ? (
          <button onClick={onLogout} style={{ color: "white", background: "transparent", border: "1px solid white", padding: "5px 10px", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", margin: "10px" }}>Login</Link>
            <Link to="/register" style={{ color: "white", margin: "10px" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}