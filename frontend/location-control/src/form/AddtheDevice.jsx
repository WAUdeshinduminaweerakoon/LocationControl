import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddtheDevice = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uniqueSerialNumber: '',
    type: '',
    image: '',
    status: '',
    locationId: ''
  });

  const [locationIds, setLocationIds] = useState([]);
  const [error, setError] = useState('');
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    const fetchLocationIds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/location/allLocation');
        setLocationIds(response.data.map(location => location.locationId));
      } catch (error) {
        console.error('Error fetching location IDs:', error);
      }
    };

    fetchLocationIds();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (!formData.uniqueSerialNumber || !formData.type || !formData.image || !formData.status || !formData.locationId) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/device', formData); 
      console.log('Device created:', response.data);
      setBackendMessage(response.data);
      setTimeout(() => {
        setBackendMessage('');
      }, 2000);
      setFormData({
        uniqueSerialNumber: '',
        type: '',
        image: '',
        status: '',
        locationId: ''
      });
      setError('');
      navigate('/DeviceList');
    } catch (error) {
      console.error('Error creating device:', error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000); 
    }
  };

  return (
    <div className="max-w-md px-10 mx-auto mt-8 bg-gradient-to-r from-purple-600 to-purple-900 py-7 rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">Create Device</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className='bg-white rounded-xl' >
            <div className="m-6 font-bold text-red-500 rounded-xl">
          {error}
        </div>
        </div>
        
      )}
      {backendMessage && (
        <div className="mt-4 text-green-500">
          {backendMessage}
        </div>
      )}
        <div>
          <label className="block text-white">Unique Serial Number:</label>
          <input
            type="text"
            name="uniqueSerialNumber"
            value={formData.uniqueSerialNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-white">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="pos">POS</option>
            <option value="kiosk">KIOSK</option>
            <option value="signage">SIGNAGE</option>
          </select>
        </div>
        <div>
          <label className="block text-white">Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-white">Location ID:</label>
          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Location ID</option>
            {locationIds.map(locationId => (
              <option key={locationId} value={locationId}>{locationId}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="items-center justify-center px-4 py-2 font-semibold text-purple-900 bg-white rounded-md hover:bg-purple-700 hover:text-white">Create Device</button>
        <button type="submit" className="items-center justify-center px-4 py-2 font-semibold text-purple-900 bg-white rounded-md hover:bg-purple-700 hover:text-white"><Link to="/DeviceList">View Device</Link></button>
      </form>
      
    </div>
  );
};

export default AddtheDevice;
