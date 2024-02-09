import React from 'react';
import './font-awesome/css/font-awesome.min.css';
import { styled } from 'styled-components';

const Div = styled.div`
	color: red;
	text-align: center;
	background-color: burlywood;
`;

export const App = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div>
			<i className="fa fa-battery-three-quarters" aria-hidden="true"></i>
			<Div className="time">{currentYear}</Div>
		</div>
	);
};
