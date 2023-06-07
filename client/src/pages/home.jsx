import React from 'react';
import mainLeaf from '../../assets/leaf_1.png';


const Home = () => {

  return (
    <div className="main">
      <div>
        <h1 className="inlineContainer">Welcome to SomePlants!</h1>
        <img src={mainLeaf} alt="" className="leafPhoto"/>
      </div>
      <p>SomePlants is a community-led effort to catalog and provide information on native plants in your area.</p>
      <div className="textContainer">
        <p>
          Ever look at a beautiful plant and think "this would look amazing on my patio!" I have too. But plants can do more than just sit and look pretty!
        </p>
        <p>
          Having plants in your life (whether in pots or the ground) can help contribute to the health of your local ecosystem. Making sure that the plants in your home are native to the area is a great way to maximize the beneficial impact your flora children have on the environment.
        </p>
      </div>

    </div>
  )
}

export default Home;