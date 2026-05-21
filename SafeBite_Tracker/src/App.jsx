import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FoodList from "./pages/FoodList";
import FoodDetail from "./pages/FoodDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/foods" element={<FoodList />} />

            <Route path="/foods/:id" element={<FoodDetail />} />
        </Routes>
    );
}

export default App;