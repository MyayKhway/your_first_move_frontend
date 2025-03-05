import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200 sm:p-8">
      <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Sign in</h2>
      <p className="text-gray-500">Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="relative">
          <label className="block font-medium text-gray-700">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
            <label className="text-gray-700 text-sm sm:text-base">Remember me</label>
          </div>
          <a href="/forgot-password" className="text-blue-900 text-sm font-medium hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
          Sign In
        </Button>

        <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
          Don’t have an account? <a href="/signup" className="text-blue-900 font-medium hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
}
