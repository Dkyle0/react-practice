const initPostState = {};

export function postReducer(state = initPostState, action) {
	switch (action.type) {
		case 'initTodos':
			return { ...state, todos: action.payload, filtredTodos: action.payload };
		default:
			return state;
	}
}
