import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/authContext";

export default function SignUpForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<string>()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        setFormState("wrong")
        console.error(`Invalid Credentials.`)
        return
      } else {
        const { user } = await response.json()
        login({
          id: parseInt(user.id),
          userName: user.userName,
          email: user.email,
          verified: user.verified,
          type: "dealer"
        })
        navigate({
          to: '/',
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormState("error")
        console.error(`Error submtting form. ${error}`)
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url(/background.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="max-w-md w-full mx-auto bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200 sm:p-8">
        <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">Sign up</h2>
        <p className="text-gray-500">Your perfect car awaits!</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <Input name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
          </div>

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

          <div className="flex items-center space-x-2">
            <Checkbox checked={formData.terms} onCheckedChange={handleCheckboxChange} />
            <label className="text-gray-700 text-sm sm:text-base">I agree to the terms and conditions</label>
          </div>

          {formState == "wrong" && <span className="text-xs text-red-500">User already exists.</span>}
          {formState == "error" && <span className="text-xs text-red-500">Error</span>}
          <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
            Register Now!
          </Button>

          <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
            Already have an account? <a href="/signin" className="text-blue-900 font-medium hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
