"use client";

import Link from "next/link";

import { credentialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await credentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error);
      } else {
        router.push("/courses");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <Card className="mx-auto max-w-sm w-full">
      {error ? (
        <div
          role="alert"
          className="mx-6 mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
        </div>
        <div className="text-center">
          Register as a {""}
          <Link href="/register/stundent" className="underline">
            student
          </Link>{" "}
          or {""}
          <Link href="/register/instructor" className="underline">
            instructor
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
