import React from 'react';
import { Link } from 'react-router-dom';
import Homeimg from "../Image/Home.png";

const Home = () => {
  return (
    <div className="grid grid-cols-1 p-10 md:grid-cols-2 bg-gradient-to-r from-violet-900 to-fuchsia-950 brightness-100"> 
      <div className="flex items-center justify-center col-span-1 md:col-span-1"> 
        <div className="object-cover object-center p-5 bg-white border-2 border-black rounded-full h-85 w-85 md:h-95 md:w-95">
          <img src={Homeimg} alt="Homeimg" className="object-cover object-center border-2 border-black rounded-full h-80 w-80 md:h-90 md:w-90" />
        </div>
      </div>
      <div className="flex items-center justify-center col-span-1 md:col-span-1"> 
        <div className="p-10">
          <h1 className="text-5xl text-gray-100 md:text-6xl">Location Control</h1>
          <div className="pt-4 text-center">
            <h3 className="text-3xl text-rose-200 md:text-3xl">"Add the Location"</h3>
            <Link to="/location" className="text-2xl text-green-400 hover:text-gray-300 md:text-3xl ">Location</Link>
          </div>
          <div className="pt-4 text-center">
            <h3 className="text-3xl text-rose-200 md:text-3xl">"Add the Device"</h3>
            <Link to="/Device" className="text-2xl text-green-400 hover:text-gray-300 md:text-3xl">Device</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

