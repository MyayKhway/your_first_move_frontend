import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, } from "lucide-react";
import LocationPicker from "./mapComponent";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/authContext";

interface FormDataType {
  name: string,
  email: string,
  password: string,
  contactNumber: string,
  website: string,
  location: {
    lat: number, lng: number, address?: string
  },
  terms: boolean
}
export default function DealerSignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<string>()
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    website: "",
    location: {
      lat: 13.728191, lng: 100.774637, address: ""
    },
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }));
  };

  const handleLocationChange = (location: { lat: number; lng: number; address?: string }) => {
    setFormData({
      ...formData,
      location,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    try {
      const response = await fetch(`${baseUrl}/auth/dealer/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        setFormState("error")
        console.error(`signing up error.`)
      }
      const { user } = await response.json()
      login({
        id: parseInt(user.id),
        userName: user.userName,
        email: user.email,
        verified: user.verified,
        type: "dealer"
      })
      navigate({
        to: '/dashboard',
      })
    } catch (error) {
      if (error instanceof Error) {
        setFormState("error")
        console.error(`Error submtting form. ${error}`)
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-center bg-no-repeat bg-cover bg-[url(/background.jpg)] h-auto">
      <div className="max-w-md w-full mx-auto bg-white text-gray-900 shadow-lg rounded-lg my-20 border border-gray-200 sm:p-8">
        <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Dealer Sign Up</h2>
        <p className="text-gray-500">Register as a car dealer to start listing vehicles.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Dealership name</label>
            <Input name="name" placeholder="Enter name of dealership:" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <Input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="relative">
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Contact Number</label>
            <Input name="contactNumber" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Website</label>
            <Input name="website" placeholder="Enter your website" value={formData.website} onChange={handleChange} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="block font-medium text-gray-700">Location</label>
            <LocationPicker
              initialLocation={formData.location}
              onLocationChange={handleLocationChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox checked={formData.terms} onCheckedChange={handleCheckboxChange} />
            <label className="text-gray-700 text-sm sm:text-base">I agree to the <Link className="underline text-blue-700" to='/tos'>terms and conditions</Link></label>
          </div>

          <div className="flex flex-col gap-2">
            {formState == "error" && <span className="text-sm text-red-500">Sign up Error</span>}
            <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
              Register as Dealer
            </Button>
          </div>

          <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
            Already have an account? <a href="/dealer-signin" className="text-blue-900 font-medium hover:underline">Sign in</a>
          </p>
        </form >
      </div >
    </div>
  );
}
