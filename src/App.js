import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import RegistrationForm from './components/RegistrationForm';
import Profile from './components/Profile';
import Footer from './components/Footer'; 

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
