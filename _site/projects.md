# Projects

<br>

<h2>Collect climate data</h2>
🌨️ Small website to monitoring local climate

<br>
<h3> Overview </h3>
[weather-inf](https://github.com/dlprisco/weather-inf) is made for tracking information in your locality and some approximate details of this, such as the minimum temperature, pressure, wind speed, humidity, etc... The information is received through calls to the official API of <a href="http://openweathermap.org/">open-weather-map</a>, returned in JSON format and processed to be rendered directly in the web page.

### Data fetching
&nbsp; To fetch current weather data from the server, is defined an asynchronous function and called from useEffect React hook to recieve a response in JSON format to unpack in the main page, you could check the parameters that are passed inside the fetch() call, i. e. **q=${city} &lat=${lat} &lon=${long}** where {city}, {lat}, {long} are one  of requiere's to proccess current weather.
   
    // This gets called on every request
    async function fetchCurrentWeather(lat, long, city) {

       // Fetch data from external API
       const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&lat=${lat}&lon=${long}&units=metric&APPID=${APIID}`)
                         .then(res => { return res.json()})
                         .then(data => {
                             const mappedData = {
                               description: data.list[0].weather[0].description,
                               temperature: data.list[0].main.temp,
                               country:data.list[0].sys.country,
                               city: data.list[0].name,
                               condition: data.list[0].weather[0].main,
                               feelsLike : data.list[0].main.feels_like,
                               windKm: data.list[0].wind.speed * 3.6,
                               clouds:data.list[0].clouds.all,
                               pressure: data.list[0].main.pressure,
                               humidity: data.list[0].main.humidity,
                             }
                         setWeatherData(mappedData);
                         setLoading(false);
            });
    }

### Run locally
&nbsp; To run this project locally it is necessary to install all the necessary dependencies, some of which may be missing and you will have to install manually on your computer.

yarn: <br>

    yarn install
    ...
    yarn start

npm: <br>

    npm install
    ...
    npm start

### Bug report
&nbsp; You can send me a message to my email with any suggestion or in case of error, you would help me a lot.

[project](/projects/weather)