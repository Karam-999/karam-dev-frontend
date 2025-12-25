import { NavLink } from 'react-router';
import { useState } from 'react';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';

const NavBar = () => {
  const active = 'text-blue-500 font-semibold';
  const base = 'transition hover:text-blue-500';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className='bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        <NavLink
          to='/'
          className='flex items-center justify-between text-lg font-bold gap-2 text-blue-400 hover:text-blue-800 transition-colors'>
          <FaLaptopCode className='text-xl' />
          <span>Karam.is-a.dev!</span>
        </NavLink>

        {/* desktkop nav */}
        <div className='hidden md:flex items-center gap-6'>
          <div className='space-x-4 text-sm text-gray-300'>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/'>
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/project'>
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/blogs'>
              Blogs
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/about'>
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/contact'>
              Contact
            </NavLink>
          </div>
        </div>
        {/* mobile nav */}
        <div className='flex items-center gap-4 md:hidden'>
          <button
            className='text-blue-500 text-xl cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title='Menu'>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* mobile nav menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-5 space-x-4 text-center'>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to='/'>
            Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={({ isActive }) => (isActive ? active : base)}
            to='/project'>
            Projects
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to='/blogs'>
            Blogs
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to='/about'>
            About
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to='/contact'>
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
