import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading/loading";

class Weather extends Component {
    state = {
        input: "",
        data: {},
        timeZone: {},
        isCheck: false,
        unitOfTemp: "°C",
        loading: false
    };

    handleInput = e => {
        this.setState({ input: e.target.value });
    };

    handleSearch = async () => {
        // const data = await axios.get(
        //   `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=1169bd3f4183d8d5de65f808e09fc2fd`
        // );
        // this.setState({ data });
        this.setState({ loading: true }, () => {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=1169bd3f4183d8d5de65f808e09fc2fd`
                )
                .then(data => {
                    this.setState({ loading: false, data });
                    const { data: latitude } = this.state.data;
                    axios
                        .get(
                            `https://api.timezonedb.com/v2.1/get-time-zone?key=WEU5OKL0T4WL&format=json&by=position&lat=${latitude.coord.lat}&lng=${latitude.coord.lon}`
                        )
                        .then(timeZone => this.setState({ timeZone }));
                });
        });
        // const timeZone = await ;
        // this.setState({ timeZone });
    };

    handleCheckbox = e => {
        this.setState({ isCheck: e.target.checked });
        if (this.state.isCheck === true) {
            const data = { ...this.state.data };
            data.data.main.temp -= 273.15;
            this.setState({ unitOfTemp: "°C" });
        } else {
            const data = { ...this.state.data };
            data.data.main.temp += 273.15;
            this.setState({ unitOfTemp: "°K" });
        }
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
                        onKeyPress={e =>
                            e.key === "Enter" ? this.handleSearch() : null
                        }
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
                {this.state.loading ? <Loading /> : JSON.stringify(this.state.data) !== JSON.stringify({}) &&
                    JSON.stringify(this.state.timeZone) !==
                        JSON.stringify({}) && this.state.loading === false && (
                        <div id="data">
                            <div id="location">
                                <label className="container">
                                    <input
                                        type="checkbox"
                                        checked={this.state.isCheck}
                                        onChange={this.handleCheckbox}
                                    />
                                    <p>°K</p>
                                </label>
                                <h2>
                                    {data.name}, {data.sys.country}
                                </h2>
                                <h4>
                                    {now.toLocaleString(
                                        `en-${data.sys.country}`,
                                        {
                                            weekday: "long",
                                            timeZone: `${this.state.timeZone.data.zoneName}`
                                        }
                                    )}
                                    ,{" "}
                                    {now.toLocaleString(
                                        `en-${data.sys.country}`,
                                        {
                                            timeStyle: "short",
                                            timeZone: `${this.state.timeZone.data.zoneName}`
                                        }
                                    )}
                                </h4>
                                <h4>{data.weather[0].description} </h4>
                            </div>
                            <div id="temperature">
                                <img
                                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                    alt="weather-icon"
                                />
                                <h1>
                                    {data.main.temp.toFixed(2)}
                                    {this.state.unitOfTemp}
                                </h1>
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
