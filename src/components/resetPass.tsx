import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    alert("Password reset link has been sent to your email.");
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-900">Forgot Password</h2>
      <p className="text-gray-500">Enter your email to reset your password.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
          Search Account
        </Button>
      </form>
    </div>
  );
}
