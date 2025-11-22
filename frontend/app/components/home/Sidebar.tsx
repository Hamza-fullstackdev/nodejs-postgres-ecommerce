"use client";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { fetcher, swrOptions } from "@/app/components/fetch";

interface Categories {
  name: string;
  slug: string;
  image: string;
}

const Sidebar = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<Categories[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/category/get-all`,
    fetcher,
    swrOptions
  );

  return (
    <aside
      className={`${
        isLoading ? "bg-gray-200 animate-pulse" : ""
      } hidden md:block w-1/5 border-r border-gray-300`}
    >
      <ul className='mt-5 flex flex-col gap-y-4'>
        {error && (
          <p className='text-sm text-red-500'>
            {error?.message || "Something went wrong"}
          </p>
        )}
        {categories?.map((item, index) => (
          <li key={index}>
            <Link href={item?.slug} className='flex items-center gap-x-3'>
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
