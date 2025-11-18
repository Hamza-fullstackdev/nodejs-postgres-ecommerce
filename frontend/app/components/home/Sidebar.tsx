import Link from "next/link";
import React from "react";

const categories = [
  {
    label: "Men's Fashion",
    link: "/men-fashion",
  },
  {
    label: "Women's Fashion",
    link: "/women-fashion",
  },
  {
    label: "Electronics",
    link: "/electronics",
  },
  {
    label: "Home & Lifestyle",
    link: "/home-lifestyle",
  },
  {
    label: "Sports & outdoor",
    link: "/sports-outdoor",
  },
  {
    label: "Groceries & pets",
    link: "/groceries-pets",
  },
  {
    label: "Medician",
    link: "/medician",
  },
  {
    label: "Jewellery",
    link: "/jewellery",
  },
  {
    label: "Toys",
    link: "/toys",
  },
];
const Sidebar = () => {
  return (
    <aside className='hidden md:block w-1/5 border-r border-gray-300'>
      <ul className='mt-5 flex flex-col gap-y-4'>
        {categories.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
