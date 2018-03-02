import * as actions from '../actions'

const initialState = {}

export default function local(state = initialState, action) {
	switch(action.type) {

        case actions.LOCAL_ACTION:
            return state

        default:
			return state

	}
}
