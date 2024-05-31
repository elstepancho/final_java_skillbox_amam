import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar || 'default_avatar_url'} alt={user.first_name} />
      <h2>{user.first_name} {user.last_name}</h2>
      <p>{user.email}</p>
      <Link to={`/user/${user.id}`}>View Details</Link>
    </div>
  );
};

export default UserCard;
