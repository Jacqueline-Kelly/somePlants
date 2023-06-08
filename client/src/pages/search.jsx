import React, { useState } from "react";
import axios from "axios";
import { FaAngleRight } from "react-icons/Fa";
import PlantCard from "../components/plantcard.jsx";

const Search = () => {
  const [zipcode, setZipcode] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const resetMessage = () => {
    setTimeout(() => setMessage(''), 5000);
  }

  const onChange = (e) => {
    e.preventDefault();
    let newZip = e.target.value;
    setZipcode(newZip);
  }

  const onClick = (e) => {
    e.preventDefault();
    axios.get('/api', {params: {zipcode: zipcode}})
    .then(res => {
      if (res.data.length) {
        setResults(res.data)
      } else {
        setMessage(`No one has submitted native plants for your zipCode yet.
        Do some research, and then submit one to help out your community!`);
        resetMessage();
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="main">
      <div style={{display: "grid"}}>
        <label>Enter your zipCode to see native plants in your area 🌱</label>
        <div className="submitZipCode">
          <input className="inputBox zipCodeBox" id="zipcode" value={zipcode} onChange={onChange} maxLength="5"/>
          <FaAngleRight size="2rem" className="arrowButton" onClick={onClick}/>
        </div>
      </div>

      {message.length ? <h2>{message}</h2> : null}

      <div className="plantCardContainer">
        {results.length ?
          results.map((item, index) => <PlantCard key={index} plant={item}/>)
        : null}
      </div>

    </div>
  )
}

export default Search;