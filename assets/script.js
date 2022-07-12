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

      var formattedDate = getFormattedDate(res.currentConditions.datetimeEpoch)
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

      // future date
      var futureDate = res.days
      var days = futureDate.slice(1,6);
      document.querySelector("futureDate0");
      for (var i = 0; i < days.length; i++) {
        // "futureDate" + i
        var day = days[i]; 
        var temp = day.temp;
        var wind = day.windspeed;
        var humidity = day.humidity;

        document.getElementById("futureDate" + i).innerHTML = getFormattedDate(day.datetimeEpoch);


      }
      


    })

     


    .catch(error => console.log('error', error));
 
};

function getFormattedDate(epochDate) {
  var myDate = new Date(epochDate *1000);
  var date = myDate.toLocaleString();
  var dateArray = date.split(",");
  return dateArray[0];
}



