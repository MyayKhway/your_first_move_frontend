import CarCard from "./carCard";
import BackgroundDecorations from "@/components/dealer_interface/backgroundDec";
import { Button } from "../ui/button";
import { getRouteApi, Link } from "@tanstack/react-router";

function CarsList() {
  const routeApi = getRouteApi('/_dealer/dashboard')
  const cars = routeApi.useLoaderData()
  return (
    <div className="bg-transparent min-h-screen">
      <BackgroundDecorations />

      <div className="px-10 py-15 m-4 shadow-pink-200">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Your Cars</h1>
          <Button asChild className="px-6 py-2 bg-blue-900 text-white text-lg rounded-lg hover:bg-blue-950">
            <Link to="/add-car">
              Add New Car
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-9 mt-6">
          {cars.length < 1 && <span>There are no cars sold by you.</span>}
          {cars.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarsList;
