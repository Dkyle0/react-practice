import { addPost, updatePost } from '../api';
import { BFF_ROLE } from '../constants/bff-role';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [BFF_ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const sevedPost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: sevedPost,
	};
};