import { removeComment } from './session/remove-comment';
import { ROLE } from './constants';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(
				session.array.forEach((key) => {
					delete session[key];
				}),
			);
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODDERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {
			break;
		}

		default:
		// ничего не делать
	}
	return session;
};
