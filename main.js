const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
  const APIkey = '2a33a1b47d4c90f305de286f96b59acd'; // Replace with your actual API key
  const city = document.querySelector('.search-box input').value.trim();

  if (city === '') {
    alert('Please enter a city name.'); // Display user-friendly message
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => {
      if (!response.ok) { // Check for response errors
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      return response.json();
    })
    .then(json => {
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.jpeg';
          break;
        case 'Rain':
          image.src = 'images/rainy.jpeg';
          break;
        case 'Snow':
          image.src = 'images/snow.jpeg';
          break;
        case 'Clouds':
          image.src = 'images/cloud.jpeg';
          break;
        default:
          image.src = 'images/cloud image.jpeg';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(wind.speed)}km/h`;
    })
    .catch(error => {
      alert('Error: Could not retrieve weather data. Please try again later.'); // Inform user about errors
      console.error(error); // Log the error for debugging
    });
});
