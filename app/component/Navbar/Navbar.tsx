import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className=" sm:px-40 bg-blue-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo (optional) */}
        <div className="text-white text-lg font-semibold flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png" // Path to your logo image in the /public directory
              alt="Logo"
              width={32} // Set the width of the image (adjust to your preference)
              height={32} // Set the height of the image (adjust to your preference)
              className="object-contain"
            />
          </Link>
        </div>
        
        {/* Links */}
        <ul className="flex gap-6 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
