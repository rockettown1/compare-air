import React from "react";
import "../styles/autocomplete.css";
import MagGlass from "../assets/icons/magnifying-glass.svg";

//All props passed from App --> Welcome --> here
const Autocomplete = ({ filteredSuggestions, showSuggestions, userInput, handleChange, handleClick }) => {
  //creating basic component for list of suggestions in autocomplete
  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <p key={index} onClick={handleClick}>
                {suggestion}
              </p>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = null;
    }
  }

  return (
    <div id="suggestion-container">
      <div id="styled-input">
        <img src={MagGlass} />
        <input
          className="input"
          type="text"
          placeholder="Enter city name..."
          onChange={handleChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </div>
      {suggestionsListComponent}
    </div>
  );
};
export default Autocomplete;
