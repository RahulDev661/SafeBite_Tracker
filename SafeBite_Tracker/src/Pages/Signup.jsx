function Signup() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-800 p-10 rounded-2xl w-[400px] shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 rounded-lg outline-none"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-white font-bold transition">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;