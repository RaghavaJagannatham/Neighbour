'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "../../../components/Button";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // State to track if it's client-side

  const router = useRouter(); // Initialize router for redirection

  useEffect(() => {
    setIsClient(true); // Set to true when the component is mounted on the client side
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // If login is successful, handle the success (e.g., store token, redirect)
      setSuccessMessage(data.message);
      setError(""); // Clear any previous errors

      // Store the JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Only redirect if it's a client-side render
      if (isClient) {
        router.push("/auth/home"); // Redirect to the home page
      }
    } else {
      // If there's an error, set the error message
      setError(data.error);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  if (!isClient) {
    return null;  // Return null or a loading spinner until the component is mounted on the client
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-50">
      <FormContainer title="" className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-lg text-gray-500">Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="mb-5 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-lg"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mb-6 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-lg"
          />
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

          <Button text="Login" className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-lg font-semibold transition duration-200" />
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-green-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Login;
