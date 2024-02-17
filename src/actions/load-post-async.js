import { setPostDataAsync } from './set-post-data';

export const loadPostAsync = (postId, requestServer) => (dispatch) => {
	requestServer('fetchPost', postId).then((postData) => {
		dispatch(setPostDataAsync(postData.res));
	});
};
