
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => { 
  return (
    <header className='flex items-center justify-between w-full h-16 sm:h-16 bg-gradient-to-r from-indigo-500  to-black '>
      
      <div className="flex items-center m-10 ">
        <Link to="/">
        <img src="" alt="" className="w-auto h-12 sm:h-10 md:h-15 lg:h-18 xl:h-22" />
        </Link>
        <Link to = '/'>
        <h1 className='m-4 text-1xl md:text-2xl lg:text-3xl xl:text-4xl'>Location Control</h1>
        </Link>
      </div>
      <div className="flex items-center m-10 space-x-6"> 
       
            <Link to="/location" className="text-white hover:text-gray-300">Location</Link>
        
      </div>
    </header>
  );
};

export default Header;