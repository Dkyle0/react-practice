import { setUserRole } from '../api';
import { BFF_ROLE } from '../constants/bff-role';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	setUserRole(userId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
