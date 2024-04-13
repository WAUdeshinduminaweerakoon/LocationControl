import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/location/allLocation');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const deleteLocation = async (locationId) => {
    try {
    
      const response = await axios.post('http://localhost:3001/location/delete-location', {
        locationId: locationId,
      });
      console.log(response);
      if (response && response.data) {
        setLocations(prevLocations => prevLocations.filter(location => location.locationId !== locationId));
        setDeleteMessage(response.data.message);
      } else {
        setDeleteMessage('Error deleting location: No response received from the server.');
      }
      setTimeout(() => {
        setDeleteMessage('');
      }, 1000);


    } catch (error) {
    //   console.error('Error deleting location:', error);
      setDeleteMessage('Error deleting location: ' + error.response.data.message);
    }
    setTimeout(() => {
        setDeleteMessage('');
      }, 1000);
};

  return (
   
    <div className="p-4 overflow-x-auto ">
       <div className='flex items-center justify-center'>
  <h2 className="mb-4 text-3xl font-bold text-yellow-100">All Locations</h2>
</div>

    
    {deleteMessage && (
      <div className="p-4 mb-4 bg-gray-100 rounded-lg">
        <p className="text-red-500">{deleteMessage}</p>
      </div>
    )}
    <div className="p-2 mb-1 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between p-1 pl-5 pr-5">
        <h3 className="p-1 text-xl text-rose-900 md:text-xl">Add the Location</h3>
        <Link to="/AddtheLocation" className="p-1 m-2 text-xl bg-orange-600 rounded-lg text-stone-800 hover:text-gray-300 md:text-xl">Add</Link>
      </div>
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
              Location Id
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
              Address
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {locations.map(location => (
            <tr key={location._id}>
              <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                {location.locationId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                {location.humanReadableName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                {location.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                {location.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                <button className="text-red-500 hover:text-red-700" onClick={() => deleteLocation(location.locationId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  

  );
};

export default LocationList;
