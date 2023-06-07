import React from 'react';
import { FaSeedling, FaSearch } from 'react-icons/Fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    let newLocation = e.target.id;
    navigate(`/${newLocation}`);
  }

  return (
    <div className="navBarContainer">

      <h1 id="" className="cursor" onClick={onClick}>SomePlants</h1>

      <div className="justifyContainer">
        <div className="navBarIconContainer">
          <FaSeedling id="add" size="45%" className="navbarIcon" onClick={onClick}/>
          <p>Add</p>
        </div>
        <div className="navBarIconContainer">
          <FaSearch id="search" size="45%" className="navbarIcon"/>
          <p>Search</p>
        </div>
      </div>

    </div>

  )
}

export default NavBar;