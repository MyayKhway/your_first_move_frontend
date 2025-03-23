import { createFileRoute } from "@tanstack/react-router";
import VerifyEmail from "@/components/emailVerify";

export const Route = createFileRoute("/_auth/verify-email")({
  component: ({ params }) => <VerifyEmail token={params.token} />,
});

