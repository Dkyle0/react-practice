import { getRoles } from '../api';
import { sessions } from '../sessions';
import { BFF_ROLE } from '../constants/bff-role';

export const fetchRoles = async (hash) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
