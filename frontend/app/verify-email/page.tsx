"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmail() {
  const rawSearchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const tokenVal = rawSearchParams.get("token");
    const emailVal = rawSearchParams.get("email");

    if (tokenVal && emailVal) {
      setToken(tokenVal);
      setEmail(emailVal);
    }
  }, [rawSearchParams]);

  useEffect(() => {
    if (token && email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verify-email?token=${token}&email=${email}`
      )
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((error: any) => setMessage(error.message));
    }
  }, [token, email]);

  return (
    <section className='my-10'>
      <div className='mx-auto w-[500px] bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-center'>
            <h1 className='text-3xl font-bold'>Email Verification</h1>
          </div>
          <div className='mt-3'>
            <h2 className='text-xl font-semibold'>Status:</h2>
            <div color='success'>
              <span className='font-medium'>{message}</span>
            </div>
          </div>
          <div>
            <Link href='/login'>
              <Button className='w-full'>Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
