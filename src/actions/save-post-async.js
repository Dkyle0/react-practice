import { setPostDataAsync } from './set-post-data';

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
	requestServer('savePost', newPostData).then((updatedPost) => {
		dispatch(setPostDataAsync(updatedPost.res));
	});
