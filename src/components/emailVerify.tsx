import { useEffect, useState } from "react";

interface VerifyEmailPropsType {
  token: string
}
const VerifyEmail = (props: VerifyEmailPropsType) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${props.token}`, { method: "POST" });
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
        <h2 className="text-2xl font-bold text-green-600">Email verified successfully!</h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">Verification failed. Please try again.</h2>
      )}
    </div>
  );
};

export default VerifyEmail;

