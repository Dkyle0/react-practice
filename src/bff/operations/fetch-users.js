import { getUsers } from '../api';
import { sessions } from '../sessions';
import { BFF_ROLE } from '../constants/bff-role';

export const fetchUsers = async (hash) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
