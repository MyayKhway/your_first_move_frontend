const CarFilters = () => (
  <div className="bg-white p-4 rounded-lg shadow-md w-50 h-108">
    <h2 className="font-semibold text-lg mb-4">Filters</h2>
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Car Prices</h3>
      <select className="w-full border p-2 rounded-md">
        <option>300,000 - 400,000</option>
        <option>500,000 - 600,000</option>
        <option>700,000 - 800,000</option>
      </select>
    </div>
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Family Size</h3>
      <select className="w-full border p-2 rounded-md">
        <option>1 - 2</option>
        <option>3 - 5</option>
      </select>
    </div>
    <div>
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Car Type</h3>
        <select className="w-full border p-2 rounded-md">
          <option>All</option>
          <option>Sedan</option>
          <option>Coupe</option>
          <option>Van</option>
        </select>
      </div>
    </div>
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Location</h3>
      <div className="relative">
        <input
          type="text"
          value="Pathum Wan, Bangkok"
          className="w-full p-2 border rounded-md shadow-sm text-gray-900"
          readOnly
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
);

export default CarFilters;
