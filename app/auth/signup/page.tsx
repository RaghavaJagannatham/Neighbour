'use client';
import { useState } from "react";
import Input from "../../../components/InputSpace";
import Button from "../../../components/Button";
import FormContainer from "../../../components/FormContainer";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", email, password);
  };

  return (
    <FormContainer title="Sign Up">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        
        <Button text="Sign Up" onClick={handleSubmit} className="bg-primary" />
        
        <div className="text-center text-sm mt-4">
          <span>Already have an account? </span>
          <Link href="/auth/login" className="link">
            Login
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Signup;
