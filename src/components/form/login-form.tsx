"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/form-schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { login } from "@/lib/actions";
import { toast } from "sonner";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((val) => {
        if (val.error) {
          toast.error(val.error);
        }
        toast.success(val.success!);
        form.reset();
      });
    });
  };

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader className="space-y-4 text-center">
        <CardTitle>🔐 Login</CardTitle>
        <CardDescription>Lets Go !!!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="jhon.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full"
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center gap-4">
        <div className="flex w-full flex-col md:flex-row justify-center items-center gap-4">
          <Button className="w-full" variant={"outline"} disabled={isPending}>
            <FcGoogle />
          </Button>
          <Button className="w-full" variant={"outline"} disabled={isPending}>
            <FaGithub />
          </Button>
        </div>
        <Link href={"/register"} className="text-sm underline">
          Dont have an account?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
