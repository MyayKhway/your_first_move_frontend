import CarCard from "@/components/user_interface/carResultCard";
import { useRouterState } from "@tanstack/react-router";
import React from "react";
import AIReasonDisplay from "@/components/user_interface/aireasonDisplay"

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
    <div className="mt-20 flex gap-4 p-8 h-svh border border-solid border-gray-400">
      <div className="flex-1 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-blue-900">
            Your Car Recommendations
          </h1>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          {
            reason ?
              <AIReasonDisplay text={reason} />
              : <AIReasonDisplay text={"No car available in our database that matches your needs."} label={"Apologies"} />
          }
          {Array.isArray(parsedRecommendations) && parsedRecommendations.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRecommendations
