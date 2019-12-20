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
            <input type="search" name="search" id="search-bar"/>
            <button type="submit" id="button">Get weather</button>
        </div>
      </div>
    );
  }
}

export default Weather;
