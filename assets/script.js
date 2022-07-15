var city = "";
var currentConditions = {};
var days = [];

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var savedWeather = [];

function fetchCityWeather() {
  city = document.getElementById("cityInput").value;
  var cityData = {
    name: "",
    currentConditions: {},
    days: []
  };

  fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + 
    `${city}` + "/" + "next7days?unitGroup=us&key=LF72Y7E6VSNAYSBWANQ5NFLS4&contentType=json", requestOptions)
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      currentConditions = res.currentConditions;
      console.log(res);
      // this is city and date
      var cityName = res.resolvedAddress.split(",")[0];

      var formattedDate = getFormattedDate(currentConditions.datetimeEpoch)
      var cityDate = cityName + " (" + formattedDate + ")"
      document.getElementById("cityDate").innerHTML = cityDate;


      // this is temperature
      var temperature = currentConditions.temp;
      document.getElementById("temp").innerHTML = "Temp: " + temperature;
      // this is wind
      var windSpeed = currentConditions.windspeed;
      document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " MPH";

      // this is humidity
      var humidity = currentConditions.humidity;
      document.getElementById("humidity").innerHTML = "Humidity: " + humidity + " %";

      // this is uv index
      var uvIndex = currentConditions.uvindex;
      document.getElementById("uvIndexH3").innerHTML = "UV Index: " + uvIndex;

      var uvIndexH3 = document.getElementById("uvIndexH3")
      if (uvIndex <= 2) {
        uvIndexH3.classList.add("uv-good");
      } else if (uvIndex > 5) {
        uvIndexH3.classList.add("uv-high");
      } else { 
        uvIndexH3.classList.add("uv-moderate");
      };
      console.log(uvIndexH3);

      // future date
      var futureDate = res.days
      days = futureDate.slice(1,6);
      for (var i = 0; i < days.length; i++) {
        // "futureDate" + i
        var day = days[i]; 
        var temp = day.temp;
        var wind = day.windspeed;
        var humidity = day.humidity;

        document.getElementById("futureDate" + i).innerHTML = getFormattedDate(day.datetimeEpoch);
        document.getElementById("futureTemp" + i).innerHTML = "Temp: " + temp;
        document.getElementById("futureWind" + i).innerHTML = "Wind: " + wind + " MPH"
        document.getElementById("futureHumidity" + i).innerHTML = "Humidity: " + humidity + " %"
      }
      
      cityData.name = cityName;
      cityData.currentConditions = currentConditions;
      cityData.days = days;


      window.localStorage.setItem("savedWeather", JSON.stringify(savedWeather));
    })

     


    .catch(error => console.log('error', error));
 
};

function getFormattedDate(epochDate) {
  var myDate = new Date(epochDate *1000);
  var date = myDate.toLocaleString();
  var dateArray = date.split(",");
  return dateArray[0];
}



