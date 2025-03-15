import CarFilters from "@/components/user_interface/carFilter";
import CarCard from "@/components/user_interface/carResultCard";
import Pagination from "@/components/user_interface/pagination";

const CarSearchResults = () => {
  const cars = [
    {
      name: "Suzuki Swift Eco",
      price: 567000,
      image: "/image/swift1.png",
      features: [
        "Automatic air conditioning",
        "9-inch touchscreen with Apple CarPlay & Android Auto",
        "Advanced safety: automatic emergency braking",
      ],
      rating: 5,
      reviews: 5,
    },
    {
      name: "Ford EcoSport",
      price: 799000,
      image: "/image/ford.png",
      features: [
        "SYNC 3 system",
        "8-inch touchscreen",
        "Safety: stability control & hill-start assist",
      ],
      rating: 4,
      reviews: 2,
    },
    {
      name: "Honda Civic FE",
      price: 1200000,
      image: "/image/civic.png",
      features: [
        "Honda Sensing Safety Suite",
        "9-inch Touchscreen with Wireless Apple CarPlay & Android Auto",
        "Turbocharged Engine",
      ],
      rating: 5,
      reviews: 10,
    },
    {
      name: "Porsche Cayenne",
      price: 6590000,
      image: "/image/cayenne.png",
      features: [
        "Horsepower – 348",
        "0-60 MPH – 5.7 seconds",
        "Top Track Speed – 154 MPH",
      ],
      rating: 5,
      reviews: 1,
    },
  ];

  return (
    <div className="mt-20 flex gap-4 p-8 h-svh border border-solid border-gray-400">
      <CarFilters />
      <div className="flex-1 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-blue-900">
            Your Car Search Results
          </h1>
          <Pagination />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSearchResults;
