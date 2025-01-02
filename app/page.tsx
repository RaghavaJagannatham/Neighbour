// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-500">
//       <h1 className="text-white text-4xl">Hello, Tailwind CSS is working!</h1>
//     </div>
    
//   );
// }


// app/page.tsx
import Link from "next/link";
// import './styles/tailwind.css';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to BookmyDoc</h1>
      <p className="text-lg mb-4">Your one-stop healthcare solution for online consultations.</p>
      
      <div className="space-x-4">
        <Link href="/auth/login" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </Link>
        <Link href="/auth/signup" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
