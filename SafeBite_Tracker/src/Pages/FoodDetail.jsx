import Navbar from "../Components/Navbar";

function FoodDetail() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        
        <h1 className="text-5xl font-bold text-green-400 mb-6">
          Milk Adulteration
        </h1>

        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl">
          
          <h2 className="text-2xl font-bold mb-4">
            Common Chemicals
          </h2>

          <ul className="list-disc ml-6 text-gray-300 mb-6">
            <li>Detergent</li>
            <li>Urea</li>
            <li>Starch</li>
            <li>Synthetic Milk Compounds</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            Health Risks
          </h2>

          <p className="text-gray-300 mb-6">
            Adulterated milk may cause stomach infection,
            kidney damage, food poisoning, and digestion problems.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Safe Alternatives
          </h2>

          <p className="text-gray-300">
            Buy certified packaged milk from trusted brands
            and always check quality certifications.
          </p>

        </div>
      </div>
    </div>
  );
}

export default FoodDetail;