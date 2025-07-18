const http = require('http');
const https = require('https');
const url = require('url');

const API_KEY = '1429e1df281d364145602770085cbee2';

function getWeatherData(city, callback) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    https.get(apiUrl, (res) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    const weather = JSON.parse(data);
                    callback(null, weather);
                } catch (e) {
                    callback('Error parsing weather data');
                }
            } else {
                const err = JSON.parse(data);
                callback(err.message || 'Failed to fetch weather data');
            }
        });
    }).on('error', (err) => {
        callback('Unable to connect to weather service');
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/weather') {
        const city = parsedUrl.query.city;

        if (!city) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'City query parameter is required' }));
            return;
        }

        getWeatherData(city, (err, weatherData) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    city: weatherData.name,
                    temperature: weatherData.main.temp,
                    description: weatherData.weather[0].description,
                    humidity: weatherData.main.humidity
                }));
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
