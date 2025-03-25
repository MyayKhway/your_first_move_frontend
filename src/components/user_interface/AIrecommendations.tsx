import CarCard from "@/components/user_interface/carResultCard";
import { Link, useRouterState } from "@tanstack/react-router";
import React from "react";
import AIReasonDisplay from "@/components/user_interface/aireasonDisplay"
import { NoCarsFound } from "./noCarFound";
import { Button } from "../ui/button";

const CarRecommendations = () => {
  const { reason, carRecommendations: rawCarRecommendations } = useRouterState({
    select: s => s.location.state
  })

  // Parse the string back to an array
  const parsedRecommendations = React.useMemo(() => {
    if (typeof rawCarRecommendations === 'string') {
      try {
        return JSON.parse(rawCarRecommendations);
      } catch (e) {
        console.error('Failed to parse car recommendations:', e);
        return [];
      }
    }
    return rawCarRecommendations || [];
  }, [rawCarRecommendations]);

  return (
    <div>
      <div className="fixed inset-0 w-full h-full min-h-screen bg-gradient-to-b from-grey-800 via-blue-200 to-blue-400 pb-16 -z-10"></div>
      <div className="mt-20 flex gap-4 p-8 h-svh border-t border-gray-400">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-blue-900">
              Your Car Recommendations
            </h1>
            <Button className="hover:bg-blue-800">
              <Link to="/">
                Search Again
              </Link>
            </Button>
          </div>
          {
            reason ?
              <AIReasonDisplay text={reason} />
              : <AIReasonDisplay text={"No car available in our database that matches your needs."} label={"Apologies"} />
          }
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {(Array.isArray(parsedRecommendations) && parsedRecommendations.length > 0) && parsedRecommendations.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
          {(Array.isArray(parsedRecommendations) && parsedRecommendations.length <= 0) && <NoCarsFound />}
        </div>
      </div>
    </div>
  );
};

export default CarRecommendations
