import React from 'react';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import SetAvatar from './components/SetAvatar/SetAvatar';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
    	<Routes>
        <Route path='/register' element={<Register />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
