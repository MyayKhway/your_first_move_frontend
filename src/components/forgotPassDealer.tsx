import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordDealer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setMessage("");
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/auth/req-reset-pass-dealer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
    console.log(res.status)
    setLoading(false)
    setMessage("A link for resetting password has been sent to the account.")
  };

  return (
    <div
      className="h-screen bg-[url(/background.jpg)] w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
    >
      <div className="w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 sm:p-10">
        <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl text-center">Forgot Password?</h2>
        <p className="text-gray-500 text-center">Enter your email to reset your password.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <Button
            type="submit"
            className="w-full bg-blue-900 text-white hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {message && <p className="text-green-600 text-center mt-3">{message}</p>}

          <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
            <a href="/signin" className="text-blue-900 font-medium hover:underline">Back to Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
