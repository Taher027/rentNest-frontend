"use client";
import { Button } from "../components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      <p>404 Path not found!</p>
      <Link href="/">
        <Button className="primary">Back To Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
