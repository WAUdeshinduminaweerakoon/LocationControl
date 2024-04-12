import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/device/allDevice');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const deleteDevice = async (uniqueSerialNumber) => {
    try {
      const response = await axios.post('http://localhost:3001/device/delete-device', {
        uniqueSerialNumber: uniqueSerialNumber,
      });
      console.log(response);
      if (response.status === 200) {
        //console.log("vfee");
        setDevices(prevDevices => prevDevices.filter(device => device.uniqueSerialNumber !== uniqueSerialNumber));
        setDeleteMessage(response.data.message);
      } else {

        setDeleteMessage('Error deleting device: ' + response.data.message);
      }
      setTimeout(() => {
        setDeleteMessage('');
      }, 2000);
    } catch (error) {

      setDeleteMessage('Error deleting device: ' + error.response.data.message);
      setTimeout(() => {
        setDeleteMessage('');
      }, 2000);
    }
  };
  

  return (
    <div className="w-full p-4 overflow-x-auto">
  <h2 className="mb-4 text-2xl font-bold">All Devices</h2>
  {deleteMessage && (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg">
      <p className="text-red-500">{deleteMessage}</p>
    </div>
  )}
  <div className="p-4 mb-4 bg-gray-100 rounded-lg">
    <div className="p-4">
      <h3 className="p-2 text-xl text-rose-900 md:text-3xl">Add the Device</h3>
      <Link to="/AddtheDevice" className="p-1 m-6 text-xl bg-orange-600 rounded-lg text-stone-800 hover:text-gray-300 md:text-3xl">Add</Link>
    </div>
  </div>
  <div className="max-w-full overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Location ID
          </th>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Device ID
          </th>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Serial Number
          </th>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Type
          </th>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Status
          </th>
          <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 md:px-4 lg:px-6">
              Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {devices.map(device => (
          <tr key={device.uniqueSerialNumber}>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">{device.locationId}</td>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">{device._id}</td>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">{device.uniqueSerialNumber}</td>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">{device.type}</td>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">{device.status}</td>
            <td className="px-2 py-2 text-xs md:px-4 lg:px-6">
              <button className="text-red-500 hover:text-red-700" onClick={() => deleteDevice(device.uniqueSerialNumber)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


          
          );
};

export default DeviceList;
