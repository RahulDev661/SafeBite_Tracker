import Navbar from "../Components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl font-bold text-green-400 mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-3">
              Total Food Cases
            </h2>

            <p className="text-4xl text-green-400 font-bold">
              245
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-3">
              Dangerous Foods
            </h2>

            <p className="text-4xl text-red-400 font-bold">
              67
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-3">
              Safe Alternatives
            </h2>

            <p className="text-4xl text-blue-400 font-bold">
              120
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;