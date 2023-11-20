import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from "../constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

function Allusers() {
  const [users, setUsers] = useState([]);
  const socket = io(API_URL); // Establish a new socket connection

  useEffect(() => {
    // Set up event listener for 'signup' events
    socket.on('signup', (userData) => {
      // Update the user list with the new user data
      setUsers((prevUsers) => [...prevUsers, userData]);
    });

    const url = API_URL + '/get-users';

    axios.get(url)
      .then((res) => {
        if (res.data.users) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        alert('Server Err.');
      });

    // Cleanup event listener on component unmount
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, [socket]);

  const handleCheckboxChange = (userId, canLogin) => {
    const confirmation = window.confirm(
      `Do you want to ${canLogin ? 'block' : 'unblock'} this user?`
    );

    if (confirmation) {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, canLogin: !canLogin } : user
      );
      setUsers(updatedUsers);

      const url = API_URL + `/update-can-login/${userId}`;
      axios.post(url, { canLogin: !canLogin })
        .catch((err) => {
          alert('Failed to update canLogin status.');
        });
    } else {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, canLogin } : user
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Liked Products</th>
            <th>Role</th>
            <th>Status</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>{user.likedProducts.join(', ')}</td>
              <td>{user.role}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.canLogin}
                  disabled={user.role === 'Admin'}
                  onChange={() => handleCheckboxChange(user._id, user.canLogin)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allusers;
