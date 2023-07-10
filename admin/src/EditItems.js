import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hotelInputs } from './formSource';
import './EditForm.css';

const EditItems = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/hotels/${id}`);
        const hotel = response.data;
        setInfo(hotel);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/hotels/${id}`, info);
      navigate('/hotels');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="card shadow mt-4">
        <div className="card-body">
          <h1 className="card-title mb-4">Edit Hotel</h1>
          <form>
            {hotelInputs.map((input) => (
              <div className="mb-3" key={input.id}>
                <label htmlFor={input.id} className="form-label">
                  {input.label}
                </label>
                <input
                  id={input.id}
                  className="form-control"
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={info[input.id] || ''}
                />
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItems;
