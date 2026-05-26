import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Foodlist from "./Pages/Foodlist";
import FoodDetail from "./Pages/FoodDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/foods" element={<Foodlist />} />
      <Route path="/food/:id" element={<FoodDetail />} />
    </Routes>
  );
}

export default App;