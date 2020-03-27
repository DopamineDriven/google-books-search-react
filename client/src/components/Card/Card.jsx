import React from "react";
import CardTitle from "../CardTitle/CardTitle.jsx";
import "./style.css";
import CardContainer from "../CardContainer/CardContainer.jsx";

function Card() {
  return (
    // The most straightforward solution would be to add the Consumer to the Card component.
    // This way, all Card components can have the Card context passed directly as props
    <CardContainer>
      {({ image }) => (
        <div
          className="card"
          style={{
            backgroundImage: image ? `url(${image})` : "none"
          }}
        >
          {/* Here, we do not pass the title to demonstrate that it can also be consumed from the CardTitleText component */}
          <CardTitle />
          {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}
        </div>
      )}
    </CardContainer>
  );
}

export default Card;
