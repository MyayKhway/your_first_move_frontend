import { Outlet } from "@tanstack/react-router";
import { AuthNavBar } from "./authNav";

export function AuthLayout() {
  <div>
    <AuthNavBar />
    <Outlet />
  </div>
}
