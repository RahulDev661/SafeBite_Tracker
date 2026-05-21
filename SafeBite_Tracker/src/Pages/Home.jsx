import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600&auto=format&fit=crop')",
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-14 rounded-3xl text-center shadow-2xl w-[90%] max-w-4xl">

                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl md:text-3xl text-white mb-4"
                >
                    Welcome to
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-5xl md:text-7xl font-extrabold text-green-400"
                >
                    SafeBite Track
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.8 }}
                    className="mt-6 text-lg md:text-2xl text-gray-200"
                >
                    Protect Yourself From Food Adulteration
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/login")}
                    className="mt-10 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl text-xl shadow-xl transition"
                >
                    Get Started
                </motion.button>
            </div>
        </div>
    );
}

export default Home;