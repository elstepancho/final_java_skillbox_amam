import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../store/userSlice';
import { Button, Form, Spinner } from 'react-bootstrap';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector(state => state.users);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: user.id, data: formData }));
  };

  return (
    <div className="container mt-4">
      {status === 'loading' ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Save</Button>
        </Form>
      )}
    </div>
  );
};

export default Profile;
