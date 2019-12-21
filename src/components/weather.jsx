import React, { Component } from "react";
import axios from "axios";

class Weather extends Component {
  state = {
    input: "",
    data: {}
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleSearch = async () => {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&APPID=1169bd3f4183d8d5de65f808e09fc2fd`
    );
    this.setState({ data });
  };

  render() {
    const { data } = this.state.data;
    console.log(data);
    
    return (
      <div id="main">
        <div id="header">
          <i className="fas fa-meteor icon"></i>
          <h1 id="appname">Weather finder</h1>
        </div>
        <div id="card">
          <div id="input">
            <input
              type="search"
              name="search"
              id="search-bar"
              placeholder="Enter your city"
              onChange={this.handleInput}
            />
            <button
              type="submit"
              id="button"
              name="search"
              onClick={this.handleSearch}
            >
              Get weather
            </button>
          </div>
          {JSON.stringify(this.state.data) !== JSON.stringify({}) && (
            <div id="data">
              <p>Location : {data.name} </p>
              <p>Temperature : {Math.floor(data.main.temp - 273.15)}°C </p>
              <p>Conditions : {data.weather[0].description} </p>
              <p>Humidity : {data.main.humidity}% </p>
              <p>Pressure : {data.main.pressure}mb </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Weather;
