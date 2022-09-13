import { useEffect, useState } from "react";
import styled from "styled-components";
import WeatherCards from "../components/WeatherCards";

function Main() {
  const [city, setCity] = useState("London");

  const [weather, setWeather] = useState(null);

  const start = new Date();

  const end = new Date(start.getTime() + 86400000 * 5);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${
        process.env.REACT_APP_API_KEY
      }&units=metric&start=${start.getTime()}&end=${end.getTime()}`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [city]);

  function getValues() {
    if (weather) {
      const maxValue = Math.max(...weather.list.map((item) => item.main.temp));

      const minValue = Math.min(...weather.list.map((item) => item.main.temp));

      const meanValue = (
        weather.list.reduce((a, b) => a + b.main.temp, 0) / 40
      ).toFixed(2);

      const modeValue = weather.list
        .map((item) => item.main.temp)
        .sort(
          (a, b) =>
            weather.list.filter((v) => v.main.temp === a).length -
            weather.list.filter((v) => v.main.temp === b).length
        )
        .pop();

      return { maxValue, minValue, meanValue, modeValue };
    } else {
      return { maxValue: 0, minValue: 0, meanValue: 0, modeValue: 0 };
    }
  }

  return (
    <Container>
      {weather ? (
        <>
          <h4>Type the requested city here</h4>
          <InputCity
            label="Type the requested city here"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br></br>
          <RangeWrapper>
            <h3>
              Max value: <b>{getValues().maxValue}°C</b>
            </h3>
            <h3>
              Mean value: <b>{getValues().meanValue}°C</b>
            </h3>
            <h3>
              Mode value: <b>{getValues().modeValue}°C</b>
            </h3>
            <h3>
              Min value: <b>{getValues().minValue}°C</b>
            </h3>
          </RangeWrapper>

          <WeatherContainer>
            {weather.list.map((e, i) => (
              <WeatherCards
                key={e.dt}
                main={e.main}
                weather={e.weather[0]}
                date={e.dt}
                sys={e.sys.pod}
              />
            ))}
          </WeatherContainer>
        </>
      ) : (
        <h1>loading</h1>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  flex: 4;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const InputCity = styled.input`
  width: 70vw;
  height: 40px;

  border-radius: 5px;
  border: none;
  background-color: #f2f2f2;
`;

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70vw;
`;
const WeatherContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20% 20% 20% 20%;
`;
export default Main;
