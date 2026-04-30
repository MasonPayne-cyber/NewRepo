Weather Dash is a Single-Page Application (SPA) designed to provide users with instaaneous localised weather data.
This project explores the layered asynchronous API responces, using geographic coordinate data to drive realtime environmental forecasts

Features:
Automatic Geolocation - uses the browsers built in navigator.geolocaiton api to detect user's current position on page load

City Search - a manual fallback search bar utisses the Nominatim OpenStreetMap API for geocoding

Layered Data Fetching - Implements a two-stage fetch process : 
1. Covert city name to Latitude/Longitude (via Nominatim API)
2. Convert coordinatess to compreshensive weather data (Open-Meteo API)

Dynamic UI - provides real-time feedback without page refreshes 


Tech Stack 

  - HTML5: Semantic structure for the SPA layout
  - CSS3: Custom styling and responsive flexbox layouts
  - Javascript: Vanilla JS utilising async/await, fetch API, and DOM manipulation
  - APIs: Open-Mateo ( https://open-meteo.com/ )
          Nominatim  ( https://nominatim.org/ )


Getting Started:

   1. Clone the repository
   2. open the project in any modern web browser
   3. when prompted, click "Allow" to test automatic geolocation feature, if declined then JSON input will beb read
   
   

Lisence and Acknowledgements
 - Legal: This project complies with the Copyright, Designs and Patents Act 1988 by using open-source APIs and public-domain data
 - Credits: Weather data provided by Open-Meteo under the Creative Commons Attributions 4.0 International Lisense 
