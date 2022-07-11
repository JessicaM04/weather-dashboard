var city = "";
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function fetchCityWeather() {
  city = document.getElementById("cityInput").value;

  fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + 
    `${city}` + "/" + "next7days?unitGroup=us&key=LF72Y7E6VSNAYSBWANQ5NFLS4&contentType=json", requestOptions)
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      console.log(res);

      // this is city and date
      var cityName = res.address;
      var myDate = new Date(res.currentConditions.datetimeEpoch *1000);
      myDate.toLocaleString();
      var date = myDate.toLocaleString();
      var dateArray = date.split(",");
      var formattedDate = dateArray[0];
      console.log(formattedDate);
      var cityDate = cityName + " (" + formattedDate + ")"
      document.getElementById("cityDate").innerHTML = cityDate;


      // this is temperature
      var temperature = res.currentConditions.temp;
      document.getElementById("temp").innerHTML = "Temp: " + temperature;
      // this is wind
      var windSpeed = res.currentConditions.windspeed;
      document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " MPH";

      // this is humidity
      var humidity = res.currentConditions.humidity;
      document.getElementById("humidity").innerHTML = "Humidity: " + humidity + " %";

      // this is uv index
      var uvIndex = res.currentConditions.uvindex;
      document.getElementById("uvIndex").innerHTML = "UV Index: " + uvIndex;
    })
    .catch(error => console.log('error', error));
};



