import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="sm:px-40 bg-blue-500 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
        </div>
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
