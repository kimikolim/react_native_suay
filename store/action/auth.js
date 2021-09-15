import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (userID, token) => {
	return dispatch => {
		dispatch({type: AUTHENTICATE, userID: userID, token: token})
	}
}

export const signup = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				//api key cannot use .env
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOk5GVRujQkUgWyMf04bAjkrmzThWJ_pY`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)

			const respData = await response.data
			// console.log(respData)

			dispatch(authenticate(respData.localId, respData.idToken))
			const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
			saveDataToStorage(respData.idToken, respData.localId, expirationDate)
		} catch (error) {
			let message = 'Oops! Something went wrong.'
            const errorResp = error.response.data.error.message
            // console.log(errorResp);
            if(errorResp === 'EMAIL_EXISTS') {
                message = "Email already exists!"
            }
            throw new Error(message)
		}


	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOk5GVRujQkUgWyMf04bAjkrmzThWJ_pY`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)

			const respData = await response.data
			// console.log(respData)

			dispatch(authenticate(respData.localId, respData.idToken))
			const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
			saveDataToStorage(respData.idToken, respData.localId, expirationDate)
		} catch (error) {
            let message = 'Oops! Something went wrong.'
            const errorResp = error.response.data.error.message
            // console.log(errorResp);
            if(errorResp === 'EMAIL_NOT_FOUND') {
                message = "Email not found!"
            } else if (errorResp === 'INVALID_PASSWORD') {
                message = "Invalid Password."
            }
            throw new Error(message)
		}
	}
}

const saveDataToStorage = (token, userID, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userID: userID,
        expiryDate: expirationDate.toISOString()
    }))
}

export const logout = () => {
	// clearLogoutTimer()
	AsyncStorage.removeItem('userData')
	return {type: LOGOUT}
}
