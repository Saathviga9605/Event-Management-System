import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import LoginForm from './LoginForm';
import EventOrganizer from './EventOrganizer';
// import Admin from './Admin';

const App_dummy= () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/eventorganizer" element={<EventOrganizer />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App_dummy;