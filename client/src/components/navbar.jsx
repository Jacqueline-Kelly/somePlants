import React from 'react';
import { FaSeedling, FaSearch } from 'react-icons/Fa';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (e, loc) => {
    e.preventDefault();
    // let newLocation = e.target.id;
    console.log(loc);
    navigate(loc);
  }

  return (
    <div className="navBarContainer">

      <h1 id="" className="cursor" onClick={(e) => onClick(e, '/')}>SomePlants</h1>

      <div className="justifyContainer">
        <div className="navBarIconContainer">
          <FaSeedling id="add" size="45%" className="navbarIcon" onClick={(e) => onClick(e, '/add')}/>
          <p>Add</p>
        </div>
        <div className="navBarIconContainer">
          <FaSearch id="search" size="45%" className="navbarIcon" onClick={(e) => onClick(e, '/search')}/>
          <p>Search</p>
        </div>
      </div>

    </div>

  )
}

export default NavBar;