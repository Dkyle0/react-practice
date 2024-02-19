import { setPostDataAsync } from './set-post-data';

export const loadPostAsync = (postId, requestServer) => (dispatch) =>
	requestServer('fetchPost', postId).then((postData) => {
		if (postData.res) {
			dispatch(setPostDataAsync(postData.res));
		}

		return postData;
	});
