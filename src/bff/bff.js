const generateDate = () =>
	new Date(Math.random() * 1000000000000 + 1999999999999)
		.toISOString()
		.substring(0, 16)
		.replace('T', ' ');

export const server = {
	async authorize(authLogin, authPassword) {
		const users = await fetch('http://localhost:3005/users').then((loadedUsers) =>
			loadedUsers.json(),
		);

		const user = users.find(({ login }) => login === authLogin);
		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Такой пароль не найден',
				res: null,
			};
		}

		const session = {
			error: null,
			res: {
				logout() {
					Object.keys(
						session.array.forEach((key) => {
							delete session[key];
						}),
					);
				},
				removeComment() {
					console.log('удаление комментария');
				},
			},
		};

		return {
			error: null,
			res: session,
		};
	},
	async register(regLogin, regPassword) {
		const users = await fetch('http://localhost:3005/users').then((loadedUsers) =>
			loadedUsers.json(),
		);

		const user = users.find(({ login }) => login === regLogin);
		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		await fetch('http://localhost:3005/users', {
			method: 'POST',
			headers: {
				'Conent-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				id: '01',
				login: regLogin,
				password: regPassword,
				registredAt: generateDate(),
				role_id: 2,
			}),
		});

		const session = {
			error: null,
			res: {
				logout() {
					Object.keys(
						session.array.forEach((key) => {
							delete session[key];
						}),
					);
				},
				removeComment() {
					console.log('удаление комментария');
				},
			},
		};

		return {
			error: null,
			res: session,
		};
	},
};
