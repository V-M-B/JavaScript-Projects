

# 🌤️ Weather App

A simple Weather App that allows users to search for weather information of any city using the OpenWeather API. The app displays the current temperature, weather description, and dynamically updates the background image based on the weather conditions.

## 🚀 Features
- Fetches real-time weather data for any city.
- Displays temperature, city name, and weather conditions.
- Dynamic background image changes based on weather (e.g., sunny, rainy, cloudy).
- Error handling for invalid city names.

## 🔧 Technologies Used
- **HTML**: Markup structure for the app.
- **CSS**: Styling and responsive design.
- **JavaScript**: Handles API requests and dynamic content updates.
- **OpenWeather API**: Fetches real-time weather data.

## 💻 Screenshots

1. **User Interface**  
   A clean and simple user interface where you can search for weather details by entering the city name.
   ![UI of Weather App](./imgs/ui.png)

2. **Search Result**  
   Example of a weather result for a searched city, displaying the temperature and weather condition.
   ![Weather Result](./imgs/result.png)



## 🔑 API Key Setup

1. Go to [OpenWeather](https://openweathermap.org/) and sign up to get your **API key**.
2. Store the API key in an environment variable (or a `.env` file locally):
   ```bash
   API_KEY=yourapikey
   ```
3. Replace the API key in `script.js` with your own key:
   ```javascript
   const API_KEY = "yourapikey";
   ```

