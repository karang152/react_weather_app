const TopButtons = ({ setQuery }) => {
    const cities = [
      { id: 1, name: "Delhi" },
      { id: 2, name: "Gurgaon" },
      { id: 3, name: "Mumbai" },
      { id: 4, name: "Haryana" },
      { id: 5, name: "Pune" },
    ];
  
    return (
      <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setQuery({ q: city.name })}
          >
            {city.name}
          </button>
        ))}
      </div>
    );
  };
  
  export default TopButtons;
  