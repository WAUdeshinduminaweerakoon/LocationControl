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
      if (response.status === 200) {
        setDevices(prevDevices => prevDevices.filter(device => device.uniqueSerialNumber !== uniqueSerialNumber));
        setDeleteMessage(response.data.message);
      } else {

        setDeleteMessage('Error deleting device: ' + response.data.message);
      }
      setTimeout(() => {
        setDeleteMessage('');
      }, 1000);
    } catch (error) {

      setDeleteMessage('Error deleting device: ' + error.response.data.message);
      setTimeout(() => {
        setDeleteMessage('');
      }, 1000);
    }
  };
  

  return (
    <div className="p-4 overflow-x-auto">
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
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Location ID
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Device ID
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Serial Number
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-8 lg:px-10">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map(device => (
              <tr key={device.uniqueSerialNumber}>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                  {device.locationId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                  {device._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                  {device.uniqueSerialNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                  {device.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
                  {device.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap md:px-8 lg:px-10">
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
