import React from "react";

const PlantCard = ({ plant }) => {

  return (
    <div className="plantCardContainer">
      <p>
        Scientific Name: <i>{plant.scientific_name}</i>
      </p>
    </div>
  )
}

export default PlantCard;