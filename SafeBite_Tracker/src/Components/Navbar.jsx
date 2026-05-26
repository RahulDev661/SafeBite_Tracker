import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold text-green-400">
        SafeBite Tracker
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/foods">Foods</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;