import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <div id="main">
        <div id="header">
          <i class="fas fa-meteor icon"></i>
          <h1 id="appname">Weather finder</h1>
        </div>
        <div id="card">
          <div id="input">
            <input
              type="search"
              name="search"
              id="search-bar"
              placeholder="Enter your city"
            />
            <button type="submit" id="button">
              Get weather
            </button>
          </div>
          <div id="data">
            <p>Location : </p>
            <p>Temperature : </p>
            <p>Humidity : </p>
            <p>Conditions : </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
