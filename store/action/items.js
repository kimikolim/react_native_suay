import axios from "axios"
import Item from  "../../models/item"

export const SET_ITEMS = "SET_ITEMS"
export const CREATE_ITEM = "CREATE_ITEM"
export const DELETE_ITEM = "DELETE_ITEM"
export const UPDATE_ITEM = "UPDATE_ITEM"

export const fetchItems = () => {
	return async (dispatch, getState) => {
		const userID = getState().auth.userID
		// console.log(getState());
        try {
            const response = await axios.get(
                "https://suay-app-default-rtdb.asia-southeast1.firebasedatabase.app/items.json"
            )
			// console.log(response);
            const respData = await response.data
            console.log(respData) //returns object, the app runs array
            const loadedItems = [] //convert back to array
            for (const key in respData) {
                loadedItems.push(
                    new Item( //id, ownerID, title, imgURL, description, price, datePurchased, dateExpired
                        key,
                        respData[key].ownerID,
                        respData[key].title,
                        respData[key].imgURL,
                        respData[key].description,
                        respData[key].price,
                        respData[key].datePurchased,
                        respData[key].dateExpired,
                    )
                )
            }
            dispatch({ type: SET_ITEMS, items: loadedItems, userItems: loadedItems.filter(item => item.ownerID === userID) })
        } catch (error) {
			throw error
            // console.log(error);
        }
	}
}

export const createItem = (title, description, imgURL, price, datePurchased, dateExpired) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token
		const userID = getState().auth.userID
		try {
			const response = await axios.post(
				`https://suay-app-default-rtdb.asia-southeast1.firebasedatabase.app/items.json?auth=${token}`,
				{
					ownerID: userID,
					title,
					description,
					imgURL,
					price,
                    datePurchased,
                    dateExpired,
				}
			)

			const respData = await response.data
			// console.log(respData)

			dispatch({
				type: CREATE_ITEM,
				itemData: {
					id: respData.name,
					ownerID: userID,
					title,
					imgURL,
					description,
					price,
                    datePurchased,
                    dateExpired,
				},
			})
		} catch (error) {
			throw error
		}
	}
}

export const updateItem = (id, title, description, imgURL, price, datePurchased, dateExpired) => {
	return async (dispatch, getState) => {
		// console.log(getState());
		const token = getState().auth.token
		// console.log(token);
		try {
			await axios.patch(
				`https://potato-shop-6559a-default-rtdb.asia-southeast1.firebasedatabase.app/items/${id}.json?auth=${token}`,
				{
					title,
					description,
					imgURL,
					price,
					datePurchased,
					dateExpired,
				}
			)


			dispatch ({
				type: UPDATE_ITEM,
				pid: id,
				itemData: {
					title,
					description,
					imgURL,
					price,
					datePurchased,
					dateExpired,
				},
			})



		} catch (error) {
			throw error
		}

	}
}