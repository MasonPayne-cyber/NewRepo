// input for searchbar to go here
const searchinput = document.getElementById("searchinput");
const displayoutput = document.getElementById("displayoutput");


document.getElementById("downloadBtn").addEventListener("click", () => {
    const weatherData = {
        city: searchinput.value || "Local/Default City", 
        date: new Date().toLocaleDateString(),
        info: displayoutput.innerText // Grabs what's on screen
    };
    
    const blob = new Blob([JSON.stringify(weatherData, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'weather_report.json';
    link.click();
    
   
    URL.revokeObjectURL(url); 
});

/* requirement 3: JSON input from a flat file */
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
      console.log("Loaded default city from flat file:", data.defaultCity);
      /* auto loads until geolocation is accepted */
  });

if (navigator.geolocation) {
    /* Built-in browser function to request location data */
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            const weather = await getweatherdata(lat, lon);
            displayoutput.innerText = `Local Weather \n It is ${weather.temp} Celcius \n with winds reaching ${weather.wind}km/h. \n It will feel like ${weather.feelslike} degrees celcius \n and with a ${weather.rain}% chance of rain.`;
        },
        async (error) => {
            // FIX 2: Fetch and load default city data from JSON when location is denied
            displayoutput.innerText = "Location access refused. Loading default city...";
            try {
                const response = await fetch('./data.json');
                const data = await response.json();
                const defaultCity = data.defaultCity;
                
                // Now run the default city through your existing functions
                const coords = await getlocationcoords(defaultCity);
                if (coords) {
                    const weather = await getweatherdata(coords.latitude, coords.longitude);
                    displayoutput.innerText = `Default City (${defaultCity}) \n It is ${weather.temp} Celcius \n with winds reaching ${weather.wind}km/h. \n It will feel like ${weather.feelslike} degrees celcius \n and with a ${weather.rain}% chance of rain.`;
                }
            } catch (err) {
                displayoutput.innerText = "Location access refused. Please type a city name.";
                console.error("Could not load default city from JSON:", err);
            }
        }
    );
}



async function getlocationcoords(cityname) {

const input3 = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityname)}&format=json&limit=1`);
const output3 = await input3.json();
/* q=${encodeURIComponent(cityName)} = query that sends data stored in cityName
to the URL. encodeURIComponent turns spaces into %20 for data safety

&format = json , tells the api server to return the data in a json format for easy
extraction in javascript

&limit=1 tells the server to only send 1 match
I will add some kind of clearing/ showing multiple results, for example theres
2+  torquays 
*/
// Check if the API actually found the city
    if (output3 && output3.length > 0) {
        return {
            latitude : output3[0].lat,
            longitude : output3[0].lon
        };
    }
    return null; // Return null instead of crashing
}

// requires an input of coordinates so getlocationcoords(displayoutput) is required
async function getweatherdata(lat, lon) {
// collect data from open meteo
    const input2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&weather_code&hourly=apparent_temperature&hourly=precipitation_probability`);
// I can add any data meteo provides by adding & tags which will make the api add that data to the json file
    const output2 = await input2.json();
// fetch data from input.json


// current_weather objects
    const temp = output2.current_weather.temperature;
    const wind = output2.current_weather.windspeed;


    // hourly objects
    const feelslike = output2.hourly.apparent_temperature[0];
    const rain = output2.hourly.precipitation_probability[0];

/* async and await are here as the javascript will crash if it can't execute with
with information it doesn't have */
return {temp, wind, feelslike, rain};

}


searchinput.addEventListener("keydown" , async (e) => {
if (e.key === "Enter") {
    const cityname = e.target.value;
    displayoutput.innerText = "Loading...";

    const coords = await getlocationcoords(cityname)

    // if getlocationcoords() fails, hopefully it says location not found 
    // it doesn't but I will add try-catch blocks later
    if (coords) {
        const weather = await getweatherdata(coords.latitude, coords.longitude);
        displayoutput.innerText = `Current Conditions in that City \n it is ${weather.temp} Celcius \n with winds reaching ${weather.wind}km/h. \n It will feel like ${weather.feelslike} degrees celcius \n and with a ${weather.rain}% chance of rain`;
    } else {
        displayoutput.innerText = "Location not found...";
    }
}


});

