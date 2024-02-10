export async function getWeather(city, countryCode) {
	const apiKey = '0b53e40528f8d3c52f4b23c77a7f134b';
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&lang=ru&units=metric&APPID=${apiKey}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Ошибка запроса данных о погоде: ' + response.statusText);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
