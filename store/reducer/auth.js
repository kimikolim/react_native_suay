import { AUTHENTICATE, LOGOUT } from "../action/auth"

const initialState = {
    token: null,
    userID: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userID: action.userID
            }

        case LOGOUT:
            return initialState
        default:
            return state
    }
}