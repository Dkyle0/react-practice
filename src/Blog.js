import React from 'react';
import './font-awesome/css/font-awesome.min.css';
import { styled } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header/header';
import { Footer } from './components/foter';
import { Authorization, Registration } from './components/pages/';

const Content = styled.div`
	padding: 120px 0;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: white;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Страница главная</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<div>Страница пользователей</div>} />
					<Route path="/post/" element={<div>Страница новых постов</div>} />
					<Route path="/post/:post_id" element={<div>Страница постов</div>} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
