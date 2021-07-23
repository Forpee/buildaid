import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { Transition } from "@headlessui/react";
import Link from 'next/link'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="z-20">
      <div className="bg-gray-50 overflow-x-hidden flex h-20 justify-between z-20 px-4 lg:px-16">
        <div className=" flex items-center h-full">
          <a className="flex items-center h-full" href="/">
            <img className="h-8 my-auto" src="/logo.png" alt="logo" />
            <div></div>
          </a>
        </div>
        <div className="hidden md:flex items-center ">
          <div>
            <a
              className="font-medium  mx-6 hover:text-yellow-400 text-gray-500"
              href="/"
            >
              Home
            </a>
          </div>
          <div>
            <a
              className="font-medium mx-6 hover:text-yellow-400 text-gray-500"
              href="/"
            >
              Materials
            </a>
          </div>
          <div>
            <a
              className="font-medium mx-6 hover:text-yellow-400 text-gray-500"
              href="/"
            >
              About
            </a>
          </div>
        </div>
        <div className='hidden md:flex my-auto'>
          <button className="bg-gray-900 font-medium px-10 rounded-2xl py-2 text-white mx-2 ">
          <Link href='/quote'>
            <a>Quote</a>
          </Link>
          
           </button>
          <button className="border-gray-900 border font-medium px-8 rounded-2xl py-2 text-black mx-2">Contact </button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className={!isOpen ? "" : "hidden"}
          >
            <MenuIcon />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={!isOpen ? "hidden" : ""}
          >
            <ClearIcon />
          </button>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transfrom"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transfrom"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className=" md:hidden shadow-sm bg-gray-50 border border-t-0 border-l-0 border-r-0 border-gray-300">
          <div className="py-1 px-4">
            <a
              className="font-semibold   hover:text-gray-400 text-gray-700"
              href="/"
            >
              HOME
            </a>
          </div>
          <div className="py-1 px-4">
            <a
              className="font-semibold   hover:text-yellow-400 text-gray-700"
              href="/"
            >
              MATERIALS
            </a>
          </div>
          <div className="py-1 px-4">
            <a
              className="font-semibold   hover:text-yellow-400 text-gray-700"
              href="/"
            >
              ABOUT
            </a>
          </div>
        </div>
      </Transition>
    </div>
  );
}
