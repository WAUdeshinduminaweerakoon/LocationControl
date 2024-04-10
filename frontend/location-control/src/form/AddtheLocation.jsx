import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateLocationForm = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    humanReadableName: '',
    address: '',
    phone: '',
    multipleADevices: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/location', formData);
      console.log('Location created:', response.data);
      setFormData({
        humanReadableName: '',
        address: '',
        phone: '',
        multipleADevices: []
      });
      navigate('/LocationList');
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  return (
    <div className="max-w-md px-10 mx-auto mt-8 bg-gradient-to-r from-purple-600 to-purple-900 py-7 rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">Create Location</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Human Readable Name:</label>
          <input
            type="text"
            name="humanReadableName"
            value={formData.humanReadableName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-white">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-white">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div >
        
        <button type="submit" className="items-center justify-center px-4 py-2 font-semibold text-purple-900 bg-white rounded-md hover:bg-purple-700 hover:text-white">Create Location</button>
        <button type="submit" className="items-center justify-center px-4 py-2 font-semibold text-purple-900 bg-white rounded-md hover:bg-purple-700 hover:text-white"><Link to="/LocationList">View Location</Link></button>
      </form>
    </div>
  );
};

export default CreateLocationForm;

// TODO : Backend  message 