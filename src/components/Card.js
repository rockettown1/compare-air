import React from "react";
import moment from "moment";
import "../styles/card.css";
import Close from "../assets/icons/close.svg";

const Card = ({ data, handleRemove }) => {
  // format date into readable form eg: "Updated an hour ago"
  const parseDate = data => {
    return moment(data).fromNow();
  };

  return (
    <>
      {/*Conditional rendering, only renders IF data array contains an item */}
      {data.length > 0 &&
        data.map((data, index) => {
          return (
            <div key={index} className="city-card">
              <div id="close" onClick={() => handleRemove(index)}>
                <img id="close-icon" src={Close} />
              </div>
              <div id="wrapper">
                <p id="date">Updated {parseDate(data.measurements[0].lastUpdated)}</p>
                <h3 id="location">{data.location}</h3>
                <p id="city">in {data.city}, United Kingdom</p>
                <div id="values-container">
                  <p>Values: </p>
                  {data.measurements.map((measurement, index) => {
                    return (
                      <div key={index} id="value">
                        <p>
                          {measurement.parameter}: {measurement.value},
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Card;
