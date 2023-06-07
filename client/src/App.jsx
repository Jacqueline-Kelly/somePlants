import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Add from './pages/add.jsx';
import Search from './pages/search.jsx';

const App = () => {

  return(
    <>
      <Router>
      <NavBar />
        <Routes>
          <Route path='add' element={<Add />}/>
          <Route path='search' element={<Search />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App