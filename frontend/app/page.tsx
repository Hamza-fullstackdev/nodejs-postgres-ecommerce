"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      Hii! {user.first_name}
      {user.last_name}
    </div>
  );
}
