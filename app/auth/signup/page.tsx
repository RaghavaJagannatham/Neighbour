'use client';

import { useState } from "react";
import Input from "@/components/Input";
import Button from "../../../components/Button";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Check password complexity (e.g., at least 8 characters, one uppercase, one special character)
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[\W]/.test(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, and a special character."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-50">
      <FormContainer title="" className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-lg text-gray-500">Please fill in the details to sign up</p>
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
            className="mb-5 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-lg"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="mb-6 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-lg"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <Button
            text={isLoading ? "Signing Up..." : "Sign Up"}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-lg font-semibold transition duration-200"
            disabled={isLoading}
          />

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Signup;
