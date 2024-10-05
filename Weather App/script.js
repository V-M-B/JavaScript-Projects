document.addEventListener("DOMContentLoaded", () => {
  const cityNameDisplay = document.getElementById("city-name");
  const cityinput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");
  

  const API_KEY = "Your_api"; //env variable

  getWeatherBtn.addEventListener("click", async () => {
    //on the click on the btn
    const city = await cityinput.value.trim(); //get the name tpyed and trinm extra space
    if (!city) return; //empty value return ntg

    //web-req 1.server may throw error   2.server/database is other continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  //1
  async function fetchWeatherData(city) {
    //gets the data and return back the data//

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESponse", response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  //2
  function displayWeatherData(data) {
    //display
    console.log(data);

    //de-structing data
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;


    temperatureDisplay.textContent=`Temprature: ${main.temp}`;
    descriptionDisplay.textContent=`Weather: ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove('hidden')
    errorMsg.classList.add("hidden")
    setWeatherBackground(weather[0].main);
  }

  //3
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
    setWeatherBackground("default");
  }


  function setWeatherBackground(weatherCondition) {
    const body = document.body;
    let backgroundImage;

    switch (weatherCondition.toLowerCase()) {
        case "clear":
            backgroundImage = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
            break;
        case "clouds":
            backgroundImage = "https://images.unsplash.com/photo-1611928482473-7b27d24eab80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
            break;
        case "rain":
        case "drizzle":
            backgroundImage = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
            break;
        case "thunderstorm":
            backgroundImage = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80";
            break;
        case "snow":
            backgroundImage = "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
            break;
        default:
            backgroundImage = "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80";
    }

    body.style.backgroundImage = `url('${backgroundImage}')`;
}

  
});
