"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (response.status === 201) {
        setSuccess(response.data.message);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";
      setError(errorMsg);
    }
  };
  return (
    <main className='my-8'>
      <section className='flex gap-5 flex-wrap md:flex-nowrap justify-between'>
        <div className='w-full md:w-1/2 h-screen relative'>
          <Image src='/static/register-img.png' alt='register-img' fill />
        </div>
        <div className='w-full md:w-1/2 flex flex-col items-center justify-center'>
          <div>
            {error && (
              <Alert className='mb-3' variant={"destructive"}>
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert
                className='mb-3 q-full md:max-w-[400px]'
                variant={"default"}
              >
                <AlertCircleIcon />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <h1 className='text-2xl font-bold'>Register your account</h1>
            <p className='mt-1'>Enter your details below</p>
            <form className='my-8' onSubmit={handleFormData}>
              <div className='grid grid-cols-1 md:grid-cols-2 space-x-5 space-y-8'>
                <div>
                  <Label htmlFor='first_name' className='sr-only'>
                    First Name
                  </Label>
                  <Input
                    type='text'
                    name='first_name'
                    id='first_name'
                    autoComplete='on'
                    required
                    onChange={handleChange}
                    placeholder='First Name'
                    className='border-x-0 border-t-0 shadow-none rounded-none focus-visible:ring-0 outline-none'
                  />
                </div>
                <div>
                  <Label htmlFor='last_name' className='sr-only'>
                    Last Name
                  </Label>
                  <Input
                    type='text'
                    name='last_name'
                    id='last_name'
                    autoComplete='on'
                    required
                    onChange={handleChange}
                    placeholder='Last Name'
                    className='border-x-0 border-t-0 shadow-none rounded-none focus-visible:ring-0 outline-none'
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='phone' className='sr-only'>
                    Phone
                  </Label>
                  <Input
                    type='tel'
                    name='phone'
                    id='phone'
                    autoComplete='on'
                    required
                    onChange={handleChange}
                    placeholder='Phone'
                    className='border-x-0 border-t-0 shadow-none rounded-none focus-visible:ring-0 outline-none'
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='email' className='sr-only'>
                    Email
                  </Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='on'
                    required
                    onChange={handleChange}
                    placeholder='Email'
                    className='border-x-0 border-t-0 shadow-none rounded-none focus-visible:ring-0 outline-none'
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='password' className='sr-only'>
                    Password
                  </Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='on'
                    required
                    onChange={handleChange}
                    placeholder='Password'
                    className='border-x-0 border-t-0 shadow-none rounded-none focus-visible:ring-0 outline-none'
                  />
                </div>
              </div>
              <div className='mt-6 flex flex-col gap-5'>
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-[#DB4444] text-white py-2 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Create Account
                </button>
                <button className='w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded cursor-pointer'>
                  <FcGoogle size={20} />
                  Sign up with Google
                </button>
              </div>
              <div className='mt-5 text-center'>
                <span className='text-gray-600 text-sm'>
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className='text-[#DB4444] cursor-pointer'
                  >
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
