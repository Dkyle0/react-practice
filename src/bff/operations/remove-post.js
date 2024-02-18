import { deleteComment, deletePost, getComments } from '../api';
import { BFF_ROLE } from '../constants/bff-role';
import { sessions } from '../sessions';

export const removePost = async (hash, id) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);
	await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

	return {
		error: null,
		res: true,
	};
};
