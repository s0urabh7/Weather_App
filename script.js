const weather = document.querySelector(".weather");
const ip = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "1251dac858b36d132174bdc5f457e1f2";

weather.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = ip.value;
    if(city){
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            displayError(error);
        }
    } 
    else{
        displayError("Please Enter city");
    }
}); 

const getWeather = async(city) =>{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fethch weather data");
    }
    return await response.json();
};

const displayWeather = (data)=>{
    const {name: city, main: {temp, humidity},
           weather: [{description, id}] } = data;
    card.textContent = "";
    card.style.display =    "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getEmoji(id);


    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temp");
    humidityDisplay.classList.add("humid");
    descDisplay.classList.add("desc");
    weatherEmoji.classList.add("emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

const getEmoji = (weatherId)=>{
    switch (true){
        case (weatherId >= 200 && weatherId<300): return "⛈️";
        case (weatherId >= 300 && weatherId<400): return "🌧️";
        case (weatherId >= 500 && weatherId<600): return "🌧️";
        case (weatherId >= 600 && weatherId<700): return "🌨️";
        case (weatherId >= 700 && weatherId<800): return "🌁";
        case (weatherId === 800): return "☀️";
        case (weatherId >= 801 && weatherId<810): return "☁️";
        default: return "❓";
    }
}

const displayError = (mess)=>{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = mess;
    errorDisplay.classList.add("err");
    card.textContent = "";
    card.style.display= "flex";
    card.appendChild(errorDisplay);

}