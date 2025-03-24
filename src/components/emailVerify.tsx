import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface VerifyEmailPropsType {
  token: string
}
const VerifyEmail = (props: VerifyEmailPropsType) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
        const response = await fetch(`${baseUrl}/auth/verify-email?token=${props.token}`, { method: "POST" });
        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
        console.error(`${error}`)
      }
    };
    verifyEmail();
  }, [props.token]);

  if (status === "loading") return null; // Don't render anything while loading

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "success" ? (
        <div>
          <h2 className="text-2xl font-bold text-green-600">Email verified successfully!</h2>
          <Link to="/signin">Sign in as a user</Link>
          <Link to="/dealer-signin">Sign in as a dealership</Link>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-red-600">Verification failed. Please try again.</h2>
          <Link to="/">Go back home</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

