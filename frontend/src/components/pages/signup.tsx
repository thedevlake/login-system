import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { signupSchema, type SignupSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

function SignupForm() {
  const navigate = useNavigate();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignupSchema) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );

      toast.success(
        res.data?.message ? res.data.message : "Account created successfully!"
      );
      form.reset();
      navigate({ to: "/login" });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        toast.error(
          err.response.data.message
            ? `${err.response.data.message}`
            : "There was a problem trying to create your account, please try again."
        );
      } else {
        toast.error("An unknown was encountered, please try again.");
      }
    }
  };

  return (
    <Card className="grid w-full md:max-w-md overflow-hidden">
      <CardContent className="grid w-full p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-6 md:p-8"
          >
            <div className="grid gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  Create an account
                </p>
              </div>

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g Sofia Ali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Have an account?{" "}
                </span>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to={"/login"}>Login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
