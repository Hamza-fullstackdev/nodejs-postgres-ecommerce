"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ResetPasswordPage() {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const params = useParams();

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/reset-password/${params.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoading(false);
      setSuccess(data.message);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='min-w-[400px] shadow-xl border-none rounded-2xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            Reset Your Password
          </CardTitle>
          <p className='text-sm text-gray-500 mt-1'>
            Enter your new password below
          </p>
        </CardHeader>

        <CardContent>
          <form className='space-y-5' onSubmit={handleFormData}>
            {error && (
              <Alert variant='destructive'>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-medium text-gray-700'
              >
                New Password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter new password'
                className='p-2 border-gray-300'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='confirmPassword'
                className='text-sm font-medium text-gray-700'
              >
                Confirm Password
              </Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='Re-enter new password'
                className='p-2 border-gray-300'
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type='submit'
              disabled={loading}
              className={`${
                loading ? "cursor-not-allowed opacity-50" : ""
              } w-full`}
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
