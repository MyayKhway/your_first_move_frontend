import { Button } from "@/components/ui/button";
import { RatingStars } from "./ratingStars";
import { useNavigate } from "@tanstack/react-router";


// Define the Car type
interface Car {
  id: number,
  make: string;
  model: string;
  features: string[];
  rating: number;
  reviews: number;
  mainPicUrl: string;
  msrp: number;
}

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-row space-x-4 items-center min-w-[100%]">
      <img
        src={car.mainPicUrl}
        alt={car.model}
        className="rounded-lg w-64 h-40 object-cover"
      />
      <div className="flex flex-col space-y-2 w-full">
        <h3 className="text-lg font-semibold">{`${car.make} ${car.model}`}</h3>
        <p className="text-blue-900 font-bold">฿ {car.msrp.toLocaleString()}</p>
        <ul className="text-gray-600 text-sm space-y-1">
          {car.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center space-x-2">
              <span>✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <RatingStars rating={car.rating} reviews={car.reviews} />
        <div className="flex gap-4 justify-center items-end">
          <div className="flex space-x-2 mt-2 ml-auto self-end">
            {/* <Button */}
            {/*   variant="outline" */}
            {/*   className="border-blue-600 text-blue-600 hover:bg-blue-100" */}
            {/* > */}
            {/*   Locate Dealership */}
            {/* </Button> */}
            <Button onClick={() => navigate({
              to: `/cars/${car.id}`
            })} className="bg-blue-900 text-white hover:bg-blue-950">
              Explore Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CarCard;
