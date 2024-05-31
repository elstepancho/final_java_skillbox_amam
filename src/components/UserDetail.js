import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, editUser } from '../store/userSlice';
import { Button, Form, Spinner } from 'react-bootstrap';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector(state => state.users);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

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
    dispatch(editUser({ id, data: formData }));
    setEditMode(false);
  };

  if (status === 'loading') {
    return <Spinner animation="border" />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      <div className="mt-3">
        {editMode ? (
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
            <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
          </Form>
        ) : (
          <>
            <img src={user.avatar} alt={user.first_name} />
            <h2>{user.first_name} {user.last_name}</h2>
            <p>{user.email}</p>
            <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
