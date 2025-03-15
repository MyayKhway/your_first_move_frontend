import { Button } from "@/components/ui/button";
import { RatingStars } from "./ratingStars";
import IconButtons from "./iconButtons";

// Define the Car type
interface Car {
  image: string;
  name: string;
  price: number;
  features: string[];
  rating: number;
  reviews: number;
}

const CarCard: React.FC<{ car: Car }> = ({ car }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 flex flex-row space-x-4 items-center min-w-[100%]">
    <img
      src={car.image}
      alt={car.name}
      className="rounded-lg w-64 h-40 object-cover"
    />
    <div className="flex flex-col space-y-2 w-full">
      <h3 className="text-lg font-semibold">{car.name}</h3>
      <p className="text-blue-900 font-bold">฿ {car.price.toLocaleString()}</p>
      <ul className="text-gray-600 text-sm space-y-1">
        {car.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center space-x-2">
            <span>✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* RATING STAR */}
      <RatingStars rating={car.rating} reviews={car.reviews} />
      <div className="flex gap-4 justify-center items-end">
        <IconButtons />
        <div className="flex space-x-2 mt-2 ml-auto self-end">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-100"
          >
            Locate Dealership
          </Button>
          <Button className="bg-blue-900 text-white hover:bg-blue-950">
            Explore Details
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;
