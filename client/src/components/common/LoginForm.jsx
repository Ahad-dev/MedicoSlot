import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from "../ui/form";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/patient";
import { login } from "@/services/login";

import { useNavigate } from "react-router-dom";
import { CardWrapper } from "./CardWrapper";
import { useAuthentication } from "@/context/AuthenticationContext";
import { useState, useTransition } from "react";
import { LoaderComponent } from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const LoginForm = () => {
  const navigation = useNavigate();
  const { setIsAuthenticated, setUser } = useAuthentication();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      CNIC: "",
      password: "",
    },
  });

  const handleSubmit = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      console.log(data);
      login(data)
        .then((result) => {
          console.log(result)
          if (result?.success) {
            console.log(result);
            setIsAuthenticated(true);
            setUser(result.user);
            setSuccess("Logged in successfully");
            //Wait for 1 second before redirecting
            setTimeout(() => {
              if(result.user.role === 'Patient') navigation("/patient/dashboard");
              else if(result.user.role === 'Doctor') navigation("/doctor/dashboard");
              else if(result.user.role === 'Admin') navigation("/admin/dashboard");
            }, 500);
          } else {
            setError(result.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    });
    //redirect to patient dashboard
  };
  return (
    <CardWrapper
      headerLable={"Login"}
      backButtonLabel={"Don't have an Account"}
      backButtonhref={"/register"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="CNIC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNIC</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="text"
                    placeholder="331000656154"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="rounded-none p-5   focus-visible:ring-0  outline-none  bg-gray-400/20 border-t-0 border-l-0 border-r-0 border-b border-slate-500/20 placeholder:text-gray-400"
                    {...field}
                    type="password"
                    placeholder="*********"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {error && <ErrorMessage error={error} />}
          {success && <SuccessMessage success={success} />}
          <Button
            disabled={isPending}
            type="submit"
            className="bg-Primary-dark-Green text-white w-full p-5 rounded-none"
          >
            {!isPending ? "Login" : <LoaderComponent />}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
