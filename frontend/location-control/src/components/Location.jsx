import React from 'react'
import { Link } from 'react-router-dom';
import Locationimg from "../Image/Location.jpeg";

const Location = () => {
  return (
    <div className="grid grid-cols-1 p-10 md:grid-cols-2 bg-gradient-to-r from-violet-900 to-fuchsia-950 brightness-100"> 
    <div className="flex items-center justify-center col-span-1 md:col-span-1"> 
        <div className="object-cover object-center p-5 bg-white border-2 border-black rounded-full h-85 w-85 md:h-95 md:w-95">
          <img src={Locationimg} alt="Homeimg" className="object-cover object-center border-2 border-black rounded-full h-80 w-80 md:h-90 md:w-90" />
        </div>
      </div>
    <div className="col-span-1 md:col-span-1"> 
  <div className="m-auto md:mt-20">
    <h1 className="text-5xl text-gray-100 md:text-6xl">Location Control</h1>
    <div className="flex items-center justify-between p-1 pl-5 pr-5 mt-5">
      <h3 className="p-1 text-xl text-lime-200 md:text-3xl">Add the Location</h3>
      <Link to="/AddtheLocation" className="p-1 m-2 text-xl bg-orange-600 rounded-lg text-stone-800 hover:text-gray-300 md:text-2xl">Add</Link>
    </div>
    <div className="flex items-center justify-between p-1 pl-5 pr-5">
      <h3 className="p-1 text-xl text-lime-200 md:text-3xl">View All Location</h3>
      <Link to="/LocationList" className="p-1 m-2 text-xl bg-orange-600 rounded-lg text-stone-800 hover:text-gray-300 md:text-2xl">View</Link>
    </div>
  </div>
</div>
</div>

  );
};

export default Location
//TODO: operation for displaying location details about all stored locations