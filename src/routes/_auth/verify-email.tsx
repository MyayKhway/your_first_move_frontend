import { createFileRoute, useSearch } from "@tanstack/react-router";
import VerifyEmail from "@/components/emailVerify";

export const Route = createFileRoute("/_auth/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: search.token as string,
    type: search.type as string
  }),
  component: () => {
    return (<VerifyEmail />)
  },
});

