import React, { Component } from "react";
import axios from "axios";

class Weather extends Component {
  state = {
    input: "",
    data: {},
    timeZone: {}
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleSearch = async () => {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=1169bd3f4183d8d5de65f808e09fc2fd`
    );
    this.setState({ data });
    const { data: latitude } = this.state.data;
    const timeZone = await axios.get(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=WEU5OKL0T4WL&format=json&by=position&lat=${latitude.coord.lat}&lng=${latitude.coord.lon}`
    );
    this.setState({ timeZone });
  };

  render() {
    const { data } = this.state.data;
    const now = new Date();

    return (
      <div id="main">
        <div id="header">
          <i className="fas fa-meteor icon"></i>
          <h1 id="appname">Weather finder</h1>
        </div>
        <div id="input">
          <input
            type="search"
            name="search"
            id="search-bar"
            placeholder="Enter your city"
            onChange={this.handleInput}
            onKeyPress={e => (e.key === "Enter" ? this.handleSearch() : null)}
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
        {JSON.stringify(this.state.data) !== JSON.stringify({}) &&
          JSON.stringify(this.state.timeZone) !== JSON.stringify({}) && (
            <div id="data">
              <div id="location">
                <h2>
                  {data.name}, {data.sys.country}
                </h2>
                <label className="container">
                  One
                  <input type="checkbox" defaultChecked={false} />
                  <span className="checkmark"></span>
                </label>
                <h4>
                  {now.toLocaleString(`en-${data.sys.country}`, {
                    weekday: "long"
                  })}
                  ,{" "}
                  {now.toLocaleString(`en-${data.sys.country}`, {
                    timeStyle: "short",
                    timeZone: `${this.state.timeZone.data.zoneName}`
                  })}
                </h4>
                <h4>{data.weather[0].description} </h4>
              </div>
              <div id="temperature">
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                />
                <h1>{data.main.temp}°C </h1>
              </div>
              <p>Wind speed: {data.wind.speed}Km/hr</p>
              <p>Humidity: {data.main.humidity}% </p>
              <p>Pressure: {data.main.pressure}mb </p>
            </div>
          )}
      </div>
    );
  }
}

export default Weather;
