const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=-45.8742&longitude=170.5036&hourly=temperature_2m,relative_humidity_2m&current=temperature_2m,relative_humidity_2m&timezone=Pacific%2FAuckland";

let weatherData;

function LoadWeatherData(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => weatherData = data)
        .catch(err => console.error('Error fetching data:', err));
}

LoadWeatherData(apiURL)
.then(() => {
    const body = document.querySelector("body");
    body.innerHTML += `
    <h2>Latitude: ${weatherData.latitude}</h2>
    <h2>Longitude: ${weatherData.longitude}</h2>`

    const table = document.createElement("table");
    table.className = "hourly-weather";
    table.innerHTML = `
    <thead>
        <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Humidity</th>
        </tr>
    </thead>`;

    for (let i =0; i < weatherData.hourly.time.length; i++){
        table.innerHTML += `
        <tr>
            <td class="time">${weatherData.hourly.time[i]}</td>
            <td class="temp">${weatherData.hourly.temperature_2m[i]}</td>
            <td class="humidity">${weatherData.hourly.relative_humidity_2m[i]}</td>
        </tr>`;
    }

    body.appendChild(table);
});






