"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INVALID_EMAIL_MESSAGE } from "@/constants";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL_MESSAGE,
  }),
  password: z.string(),
});

export default function Login() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="w-auto h-screen">
      <div className="w-96 text-sm flex flex-row justify-between my-16">
        <div className="flex flex-row justify-around items-center">
          <ArrowLeft />
          <Link href="https://www.viconetgroup.com/" passHref={true}>
            Back
          </Link>
        </div>
        <div>
          <Link className="text-teal-700" href={"/auth/register"}>
            Create an account.
          </Link>
        </div>
      </div>
      <div className="m-14">
        <p className="text-center font-bold text-2xl">Talent Login</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
