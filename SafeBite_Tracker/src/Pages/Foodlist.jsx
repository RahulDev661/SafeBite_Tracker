import Navbar from "../Components/Navbar";
import Foodcard from "../Components/Foodcard";
import foodData from "../data/foodData";

function Foodlist() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-10 grid md:grid-cols-3 gap-6">
        
        {foodData.map((food) => (
          <Foodcard
            key={food.id}
            name={food.name}
            danger={food.danger}
          />
        ))}

      </div>
    </div>
  );
}

export default Foodlist;