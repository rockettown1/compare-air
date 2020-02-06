import React, { Component } from "react";
import Welcome from "./components/Welcome";
import Card from "./components/Card";
import "./styles/app.css";

class App extends Component {
  state = {
    data: [],
    cities: [],
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    search: ""
  };
  //grab cities to populate autocomplete search before components are rendered
  async componentDidMount() {
    const citiesURL = "https://api.openaq.org/v1/cities?country=GB";
    const citiesResponse = await fetch(citiesURL);
    const citieslist = await citiesResponse.json();
    let citiesArray = [];
    for (let i = 0; i < citieslist.results.length; i++) {
      citiesArray.push(citieslist.results[i].city);
    }
    this.setState({ cities: citiesArray });
  }

  //handle dropdown list based on user input
  handleInputChange = e => {
    const { cities } = this.state;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = cities.filter(
      city =>
        city
          .toLowerCase()
          .slice(0, userInput.length)
          .indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      userInput: e.currentTarget.value,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true
    });
  };

  //set search when user selects option and run fetch request
  handleInputClick = async e => {
    await this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      search: e.currentTarget.innerText
    });

    this.handleSubmit();
  };

  //run fetch request after user has selected option
  handleSubmit = async () => {
    const url = `https://api.openaq.org/v1/latest?country=GB&city=${this.state.search}`;
    const response = await fetch(url);
    const data = await response.json();

    let result = [...this.state.data];
    result.push(data.results[0]);
    this.setState({
      data: result
    });
  };

  //handle removing a card when user clicks the X
  handleRemove = index => {
    console.log(index);
    let result = [...this.state.data];
    result.splice(index, 1);
    this.setState({ data: result });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <Welcome
          handleChange={this.handleInputChange}
          handleClick={this.handleInputClick}
          showSuggestions={this.state.showSuggestions}
          filteredSuggestions={this.state.filteredSuggestions}
          userInput={this.state.userInput}
        />
        <div className="card-container">
          <Card data={data} handleRemove={this.handleRemove} />
        </div>
      </>
    );
  }
}

export default App;
