import LoginForm from "@/components/pages/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginForm,
});
