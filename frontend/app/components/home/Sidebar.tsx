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
  console.log(categories);
  console.log(error);
  if (error) return <p>Error loading categories</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <aside className='hidden md:block w-1/5 border-r border-gray-300'>
      <ul className='mt-5 flex flex-col gap-y-4'>
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
