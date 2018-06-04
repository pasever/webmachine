import React from "react";

import "./network.css";

export const JoinedClient = ({ network, handleCallToUpdateProfile }) => (
  <div className="network" >
    <a className="client-name" onClick={() => handleCallToUpdateProfile(true, network._id, network.name)}>
      {network.image === "" ? (
        <img
          src="static/images/noimages.jpg"
          className="img-fluid"
          alt="No image uploaded"
        />
      ) : (
        <img
          src={network.image}
          className="img-fluid"
          alt={`${network.name}'s Logo`}
        />
      )}
      <span>{network.name}</span>
    </a>
  </div>
);
