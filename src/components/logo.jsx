import React from "react";
import craftImage  from '../assets/craftr-high-resolution-logo.jpg'

function Logo({ width = "100px" }) {
  return (
    <div className="object-cover">
      <img className="w-32" src={craftImage} alt="" />

    
    </div>
    
  );
}

export default Logo;
