"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/app/firebase/firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/features/user/userSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface GoogleOauthProps {
  title: string;
}
const GoogleOauth = (props: GoogleOauthProps) => {
  const auth = getAuth(app);
  const [error, setError] = useState("");
  const [loading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleOauth = async () => {
    setError("");
    setIsloading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/google-login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName || "",
            email: result.user.email || "",
            avatar: result.user.photoURL || "",
            phone: result.user?.phoneNumber,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(loginUser(data));
        router.push("/");
      } else {
        setError(data.message);
        setIsloading(false);
      }
    } catch (error: any) {
      console.error(error);
      let customErrorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/account-exists-with-different-credential") {
        customErrorMessage =
          "Account already exists with different credentials.";
      }
      if (error.code === "auth/popup-closed-by-user") {
        customErrorMessage =
          "You closed the popup before completing the sign-in.";
      }
      setError(customErrorMessage);
      setIsloading(false);
    }
  };
  return (
    <>
      <Button
        variant='outline'
        type='button'
        disabled={loading}
        onClick={handleGoogleOauth}
        className={`${loading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <FcGoogle className='mr-2 h-4 w-4' />
        {props.title}
      </Button>
      {error && <div className='mt-2 text-red-500 text-sm'>{error}</div>}
    </>
  );
};

export default GoogleOauth;
