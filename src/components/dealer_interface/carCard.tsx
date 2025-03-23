import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface CarCardProps {
  id: number,
  make: string,
  model: string,
  msrp: number,
  mainPicUrl: string,
  features: string[]
}

const CarCard: React.FC<CarCardProps> = ({ id, make, model, msrp, mainPicUrl, features }) => {
  const navigate = useNavigate()
  const handleDelete = async (id: number) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
      const res = await fetch(`${baseUrl}/car/${id}`, {
        method: "DELETE",
        credentials: "include"
      })
      if (!res.ok) {
        toast.error("Error deleting the car.", {
          description: `${res.status}`
        })
      }
      toast.success("Car successfully deleted", {
        description: `${make} ${model} from ${localStorage.userName} is gone.`
      })
    } catch (err) {
      toast.error("Error deleting the car.", {
        description: `${err}`
      })
    }
  }
  return (
    <div onClick={() => navigate({
      to: `/cars/${id}`
    })} className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <img
        src={mainPicUrl}
        alt={model}
        className="w-full h-54 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#1a237e]">{`${make} ${model}`}</h2>
        <p className="text-xl font-bold text-[#1a237e]">
          ฿ {msrp.toLocaleString()}
        </p>
        <ul className="text-gray-600 text-sm mt-2 space-y-1">
          {features.map((feature, index) => (
            <li key={index}>✔ {feature}</li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <Button onClick={() => handleDelete(id)} className="px-4 py-2 border border-red-500 text-slate-50 rounded hover:bg-red-500 hover:text-white transition">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

