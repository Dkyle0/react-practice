import { ACTION_TYPE } from '../../actions';

const initPostState = {
	id: null,
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export function postReducer(state = initPostState, action) {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
