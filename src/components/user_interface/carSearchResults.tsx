import CarCard from "@/components/user_interface/carResultCard";
import { getRouteApi, useRouterState } from "@tanstack/react-router";

const CarSearchResults = () => {
  const url = useRouterState().location.pathname.split('/')
  let routeApi;
  if (url[url.length - 1] == 'all') {
    routeApi = getRouteApi('/cars/all')
  } else {
    routeApi = getRouteApi('/cars/search/$type')
  }
  const { carResults } = routeApi.useLoaderData()

  return (
    <div className="mt-20 flex gap-4 p-8 h-svh border border-solid border-gray-400">
      <div className="flex-1 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-blue-900">
            Your Car Search Results
          </h1>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          {carResults.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSearchResults;
