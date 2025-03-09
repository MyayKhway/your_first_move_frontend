import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //TODO handle submit here
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");


    setTimeout(() => {
      setLoading(false);
      setMessage("A password reset link has been sent to your email.");
    }, 2000);
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
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
