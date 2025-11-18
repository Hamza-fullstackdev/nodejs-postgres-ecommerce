import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <>
      <div className='bg-black p-4'>
        <p className='text-center text-white text-sm'>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! -{" "}
          <strong>Shop Now!</strong>
        </p>
      </div>
      <header className='border-b border-gray-200'>
        <div className='flex justify-between items-center max-w-6xl xl:max-w-7xl mx-auto p-4'>
          <h2 className='text-2xl font-bold'>Exclusive</h2>
          <nav>
            <ul className='flex space-x-8 md:space-x-10'>
              <li>Home</li>
              <li>Contact</li>
              <li>About</li>
              <li>Register</li>
            </ul>
          </nav>
          <div>
            <Input
              type='search'
              name='search'
              id='search'
              placeholder='What are you looking for?'
              className='w-[210px]'
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
