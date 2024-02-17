import { deleteUser } from '../api';
import { BFF_ROLE } from '../constants/bff-role';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
