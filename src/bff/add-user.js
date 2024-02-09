import { generateDate } from './generate-date';

export const addUser = (login, password) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Conent-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id: '01',
			login,
			password,
			registredAt: generateDate(),
			role_id: 2,
		}),
	});
