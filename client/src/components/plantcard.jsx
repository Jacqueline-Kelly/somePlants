import React from "react";

const PlantCard = ({ plant }) => {

  return (
    <div className="plantCardContainer">
      <p>
        Scientific Name:
        <p>
        <i>{plant.scientific_name}</i>
        </p>
      </p>
    </div>
  )
}

export default PlantCard;