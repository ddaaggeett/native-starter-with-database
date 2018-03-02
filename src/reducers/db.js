import * as actions from '../actions'

const initialState = {
	userInst: {}
}

export default function db(state = initialState, action) {
	switch(action.type) {

        case actions.UPDATE_USER_INST:
            return {
				...state,
				userInst: action.newUserInst
			}

        default:
			return state

	}
}
