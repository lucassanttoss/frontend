"use client";
import Link from "next/link";

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-700">{error.message}</p>
      <Link
        href="/"
        type="button"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ErrorComponent;
