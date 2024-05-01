import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function View() {
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(null);

  // Function to handle opening the modal
  const handleOpenModal = (room) => {
    setUpdatedRoom(room);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedRoom(null);
  };

  // Function to handle updating room details
  const handleUpdateRoom = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/update`, updatedRoom);
      console.log(response.data);
      toast.success("Room updated successfully");
      setShowModal(false);
      // Refresh room data after update
      fetchData();
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error("Failed to update room");
    }
  };

  // Function to handle deleting room
  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/delete`, { params: { id: roomId } });
      console.log(response.data);
      toast.success("Room removed successfully");
      // Refresh room data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error("Failed to delete room");
    }
  };

  // Function to fetch room data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/room');
      console.log(JSON.stringify(response.data));
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching room data:', error);
      toast.error("Failed to fetch room data");
    }
  };

  // Fetch room data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Object mapping room types to image URLs
  const roomTypeImages = {
    deluxe: 'https://pmcaonline.org/wp-content/uploads/2019/10/hotel-1068x801.jpg',
    non_deluxe: 'https://th.bing.com/th/id/OIP.I9OBthj87ntToaiqIW9ZigAAAA?rs=1&pid=ImgDetMain',
    suite: 'https://example.com/suite-room-image.jpg',
  };

  return (
    <>
      <style>
        {`
          body {
            background-image: url('https://lh3.googleusercontent.com/proxy/b0PyrTKx2U4Q-lsdUBgNWNvLqbzYru77XH1_utXcGKQp8pe8KM9rX28e5WO3VOX82nhLKFK7q73srYVTZCtpupbbTe_XnsvWXKgJXbOkGP7iUrWgCBIDdtu2WFvDDmBdzoaCbez2B6m6hGFxMf4S4c53l8Ik=s0-d');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          .container {
            background-color: #ffffff; /* Set the container background color to white */
            padding: 2rem; /* Add some padding to the container */
            margin-top: 2rem; /* Adjust the margin-top as needed */
          }
        `}
      </style>

      <div>
        {result ? (
          result.map((room) => (
            <div
              key={room.roomId}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                className="card text-white bg-info mb-3"
                style={{ maxWidth: '840px', maxHeight: '600px' }}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={roomTypeImages[room.roomType.toLowerCase().replace('-', '_')]}
                      className="card-img"
                      alt=""
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{room.roomType.toUpperCase()}</h5>
                      <h5 className="card-title"><b>Room ID: </b>{room.roomId}</h5>
                      <h5 className="card-title"><b>Price:</b> {room.price} INR</h5>
                      <h5 className="card-title"><b>Vacancy: </b>{room.vacancy.toString()}</h5>
                      <p className="card-text">
                        The room you are viewing can be accommodated by{' '}
                        {room.size} persons
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{ marginLeft: '7rem', marginBottom: '1rem' }}
                      onClick={() => handleDelete(room.roomId)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{ marginLeft: '7rem', marginBottom: '1rem' }}
                      onClick={() => handleOpenModal(room)}
                    >
                      Update
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>There is no data to display...</div>
        )}
      </div>

      {/* Modal for updating room */}
      {updatedRoom && (
        <div className="modal" style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Room</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="roomId">Room ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="roomId"
                      value={updatedRoom.roomId}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={updatedRoom.price}
                      onChange={(e) => setUpdatedRoom({ ...updatedRoom, price: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vacancy">Vacancy</label>
                    <input
                      type="text"
                      className="form-control"
                      id="vacancy"
                      value={updatedRoom.vacancy.toString()}
                      onChange={(e) => setUpdatedRoom({ ...updatedRoom, vacancy: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <input
                      type="number"
                      className="form-control"
                      id="size"
                      value={updatedRoom.size}
                      onChange={(e) => setUpdatedRoom({ ...updatedRoom, size: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateRoom}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
