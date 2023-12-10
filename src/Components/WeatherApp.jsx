import { useState } from "react";
import "../Styles/Weather.css";
import Sun from "../images/download.png";
function Weather() {
  const [city, setTwon] = useState("");
  const [data, setData] = useState("");

  function fetchData() {
    try {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=88a9fc86342d4d63a98185704230712&q=${city}&days=7&aqi=yes&alerts=yes`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const getdata = (e) => {
    setTwon(e.target.value);
  };

  return (
    <div>
      <div className="inp" type="text">
        <input onChange={getdata} />
        <button onClick={fetchData}>Search</button>
      </div>
      {data && (
        <div className="parut">
          <div className="card-container">
            <div className="card">
              <p className="city">{data.location.name}</p>
              <p className="weather">{data.current.temp_c}ْ </p>
              <img src={Sun} alt="sun" className="img_sun" />
              <div className="minmaxContainer">
                <div className="min">
                  <p className="minHeading">{data.forecast.forecastday[0].day.mintemp_c} Min</p>
                </div>
                <div className="max">
                  <p className="maxHeading">{data.forecast.forecastday[0].day.maxtemp_c} Max</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cardContainer">
            {data.forecast.forecastday.map((sevinDay, index) => {
              return (
                <div key={index} className="p-1 flex justify-between border-b mt-5 items-center last:border-none">
                  <p>{new Date(sevinDay.date).toLocaleString("en-US", { weekday: "short" })}</p>
                  <div className="flex text-white items-center">
                    <img className="block" src={sevinDay.day.condition.icon} alt={sevinDay.day.condition.text} />
                    <p>{sevinDay.day.condition.text.substring(0, 7)}</p>
                  </div>
                  <div className="flex text-white degree">
                    <p>{sevinDay.day.maxtemp_c.toFixed()} /</p>
                    <p className="text-slate-400">&nbsp;{sevinDay.day.mintemp_c.toFixed()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default Weather;
