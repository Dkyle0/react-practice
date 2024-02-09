import React from 'react';
import './font-awesome/css/font-awesome.min.css';
import { styled } from 'styled-components';
import { Route, Routes } from 'react-router-dom';

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

const Header = () => <div>Хедер</div>;
const Footer = () => <div>Футур</div>;

export const Blog = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<Header />
			<Content>
				<H2>Контент страницы</H2>
				<Routes>
					<Route path="/" element={<div>Страница главная</div>} />
					<Route path="/login" element={<div>Страница авторизации</div>} />
					<Route path="/register" element={<div>Страница регистрации</div>} />
					<Route path="/users" element={<div>Страница пользователей</div>} />
					<Route path="/post/" element={<div>Страница новых постов</div>} />
					<Route path="/post/:post_id" element={<div>Страница постов</div>} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<div className="time">{currentYear}</div>
			<Footer />
		</>
	);
};
