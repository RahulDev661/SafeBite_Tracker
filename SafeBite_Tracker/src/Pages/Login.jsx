import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1600&auto=format&fit=crop')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-[90%] max-w-md"
            >
                <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
                    SafeBite Login
                </h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full p-4 rounded-xl mb-5 bg-white/20 text-white placeholder:text-gray-300 outline-none"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full p-4 rounded-xl mb-6 bg-white/20 text-white placeholder:text-gray-300 outline-none"
                />

                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-xl transition"
                >
                    Login
                </button>

                <p className="text-center text-gray-300 mt-6">
                    Don’t have an account?
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-green-400 cursor-pointer ml-2"
                    >
                        Signup
                    </span>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;