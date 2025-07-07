import SignupForm from "@/components/pages/signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: SignupForm,
});
