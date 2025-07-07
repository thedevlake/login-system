import Aurora from "@/Backgrounds/Aurora/Aurora";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 -z-10">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1}
            speed={0.5}
          />
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex items-center justify-center p-6 md:p-10">
          <Outlet />
          <Toaster position="top-center" closeButton />
        </div>
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});
