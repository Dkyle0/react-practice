import { ACTION_TYPE } from '../../actions';

const initAppState = {
	wasLogout: false,
};

export function AppReducer(state = initAppState, action) {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return { ...state, wasLogout: !state.wasLogout };
		default:
			return state;
	}
}
