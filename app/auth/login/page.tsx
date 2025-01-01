'use client';
import { useState } from "react";
import Input from "../../../components/InputSpace";
import Button from "../../../components/Button";
import FormContainer from "../../../components/FormContainer";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <FormContainer title="Login">
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
        
        <div className="forgot-password">
          <Link href="/auth/forgot-password" className="text-sm link">
            Forgot Password?
          </Link>
        </div>
        
        <Button text="Login" onClick={handleSubmit} className="bg-primary" />
        
        <div className="text-center text-sm mt-4">
          <span>Don't have an account? </span>
          <Link href="/auth/signup" className="link">
            Sign Up
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
