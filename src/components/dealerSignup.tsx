import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

export default function DealerSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    location: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dealer Sign Up Data:", formData);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200 sm:p-8">
      <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Dealer Sign Up</h2>
      <p className="text-gray-500">Register as a car dealer to start listing vehicles.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">First Name</label>
            <Input name="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Last Name</label>
            <Input name="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} />
          </div>
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
          <label className="block font-medium text-gray-700">Location</label>
          <Input name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox checked={formData.terms} onCheckedChange={handleCheckboxChange} />
          <label className="text-gray-700 text-sm sm:text-base">I agree to the terms and conditions</label>
        </div>

        <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
          Register as Dealer
        </Button>

        <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
          Already have an account? <a href="/dealer-signin" className="text-blue-900 font-medium hover:underline">Sign in</a>
        </p>
      </form>
    </div>
  );
}
