import styled from "styled-components";
const WeatherCards = ({ weather, date, main, sys }) => {
  const getDate = (d) => {
    const dateObj = new Date(d * 1000).toLocaleDateString();
    const timeObj = new Date(d * 1000).toLocaleTimeString();
    return { dateObj, timeObj };
  };

  return (
    <Container sys={sys}>
      <TitleWrapper sys={sys}>
        <h4>{getDate(date).dateObj}</h4>
        <Logo src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      </TitleWrapper>
      <WeatherContainer>
        <LeftWrapper>{main.temp}°C</LeftWrapper>
        <RightWrapper>
          <p>
            Moisture: <b>{main.humidity}%</b>
          </p>
        </RightWrapper>
      </WeatherContainer>
      <small>
        Forecast time: <b>{getDate(date).timeObj}</b>
      </small>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 2px solid ${(props) => (props.sys === "d" ? "	#75b4e3" : "#31255a")};
  border-radius: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  background-color: ${(props) => (props.sys === "d" ? "	#75b4e3" : "#31255a")};
  color: #ffffff;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 2;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  flex: 1;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  flex: 1;
`;

const Logo = styled.img`
  width: 60px;
`;

export default WeatherCards;
