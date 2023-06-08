import React from "react";

const PlantCard = ({ plant }) => {

  return (
    <div className="plantCard">
      <p>
        Scientific Name:
        <i> {plant.scientific_name}</i>
      </p>
      <p>
        Common Name:{plant.common_name.length ? " " + plant.common_name : " No common name has been classifed!"}
      </p>
      <p>
        Tags:
      </p>
      <p>
        Number of submissions by citizen scientists:
        <b> {plant.submission_count}</b>
      </p>
    </div>
  )
}

export default PlantCard;