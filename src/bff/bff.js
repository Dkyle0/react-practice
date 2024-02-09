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
		return session;
	},
};
