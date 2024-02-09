import { useEffect, useState } from 'react';
import styled from 'styled-components';

const apiKey = '877275f47a715269c315819b86ef6f4a';
async function getWeatherInMoscow(apiKey) {
	const lat = 55.7558; // Широта Москвы
	const lon = 37.6173; // Долгота Москвы
	const part = 'minutely'; // Тип данных для исключения
	const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&exclude=${part}&appid=${apiKey}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch weather data: ' + response.statusText);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('Москва');
	const [temperature, setTemperature] = useState('-5');
	const [wether, setWether] = useState('облачно');
	// Пример использования функции

	useEffect(() => {
		getWeatherInMoscow(apiKey)
			.then((data) => {
				if (data) {
					const { name, main, wether } = data;
					setCity(name);
					setTemperature(Math.round(main.temp));
					setWether(wether[0].description);
					console.log('Погода в Москве:', data.weather[0].description);
					console.log('Температура воздуха:', data.main.temp + '°C');
				} else {
					console.log('Не удалось получить данные о погоде в Москве.');
				}
			})
			.catch((error) => console.error('Ошибка:', error));
	}, []);

	const currentYear = new Date().toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
	});
	return (
		<footer className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city}, {currentYear}
				</div>
				<div>
					{temperature} градусов, {wether}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 2px 17px black;
	background-color: white;
`;
