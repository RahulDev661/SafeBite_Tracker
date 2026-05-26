function Foodcard({ name, danger }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-3">
        {name}
      </h2>

      <p className="text-red-400">
        Danger: {danger}
      </p>

      <button className="mt-4 bg-green-500 px-4 py-2 rounded-lg">
        View Details
      </button>
    </div>
  );
}

export default Foodcard;