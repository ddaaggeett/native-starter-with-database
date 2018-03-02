import * as actions from '.'

export function updateUserInst(newUserInst) {
    return {
        type: actions.UPDATE_USER_INST,
        newUserInst
    }
}
export function localAction() {
    return {
        type: actions.LOCAL_ACTION,
    }
}
