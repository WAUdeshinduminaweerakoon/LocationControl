import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  <h2 className="mb-4 text-2xl font-bold">All Locations</h2>
  {deleteMessage && (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
          <p className="text-red-500">{deleteMessage}</p>
        </div>
      )}
  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
