'use client'

import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
        <p className="mb-6">Please login or sign up to get started.</p>
        <div className="space-x-4">
          <Link href="/auth/login">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md">Login</button>
          </Link>
          <Link href="/auth/signup">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
