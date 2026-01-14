// input for searchbar to go here
const searchinput = document.getElementById("searchinput");
const displayoutput = document.getElementById("displayoutput");

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

const lat = output3[0].lat;
const lon = output3[0].lon;
// store and return the coords from the input json
return {latitude: lat, longitude: lon};

}




// requires an input of coordinates so getlocationcoords(displayoutput) is required
async function getweatherdata(lati, long) {
// collect data from open meteo
    const input2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);

    const output2 = await input.json();
/* async and await are here as the javascript will crash if it can't execute with
with information it doesn't have */


}


searchinput.addEventListener("enter" , (e) => {
displayoutput.innerText = e.target.value;
});

