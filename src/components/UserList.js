import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/userSlice';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={user.avatar} />
              <Card.Body>
                <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Link to={`/users/${user.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
