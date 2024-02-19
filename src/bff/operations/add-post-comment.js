import { addComment, getPost } from '../api';
import { BFF_ROLE } from '../constants/bff-role';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [BFF_ROLE.ADMIN, BFF_ROLE.MODDERATOR, BFF_ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);
	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
