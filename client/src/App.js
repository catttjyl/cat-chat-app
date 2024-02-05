import React from 'react';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Join from './components/Join/Join';
import Chat from './pages/Chat/Chat';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
    	<Routes>
        <Route path='/register' element={<Register />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path="/" element={<Join />} exact />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
