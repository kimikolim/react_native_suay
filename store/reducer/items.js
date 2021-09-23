import ITEMS from '../../data/seed-data'
import Item from '../../models/item'

//import actions from redux actions
import { SET_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_FAVOURITE } from '../action/items'

const initialState = {
    // userItems: ITEMS.filter((item) => item.ownerID === "u1")
    allItems: [],
    userItems: [],
    favouriteItems: [],
}

const itemsReducer = (state = initialState, action) => {
    // console.log(state);
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                allItems: action.items,
                userItems: action.userItems
            }
        case CREATE_ITEM:
            const newItem = new Item (
                action.itemData.id,
                action.itemData.ownerID,
                action.itemData.title,
                action.itemData.imgURL,
                action.itemData.description,
                action.itemData.price,
                action.itemData.datePurchased,
                action.itemData.dateExpired,
            )
            return {
                ...state,
                allItems: state.allItems.concat(newItem),
                userItems: state.userItems.concat(newItem)
            }
        case UPDATE_ITEM:
                const itemIndex = state.userItems.findIndex(
                    (item) => item.id === action.pid
                )
                // console.log(itemIndex)
                const updatedItem = new Item(
                    action.pid,
                    state.userItems[itemIndex].ownerID,
                    action.itemData.title,
                    action.itemData.imgURL,
                    action.itemData.description,
                    action.itemData.price,
                    action.itemData.datePurchased,
                    action.itemData.dateExpired,
                )
                const updatedUserItems = [...state.userItems]
                updatedUserItems[itemIndex] = updatedItem
                const allItemsIndex = state.allItems.findIndex(
                    item => item.id === action.pid
                )
                const updatedAllItems = [...state.allItems]
                updatedAllItems[allItemsIndex] = updatedItem
                return {
                    ...state,
                    allItems: updatedAllItems,
                    userItems: updatedUserItems
                }
        case DELETE_ITEM:
            return {
                ...state,
                allItems: state.allItems.filter(item => item.id !== action.pid),
                userItems: state.userItems.filter(item => item.id !== action.pid),
            }
        case SET_FAVOURITE:
            // console.log(state.favouriteItems)

            const existingIndex = state.favouriteItems.findIndex(item => item.id === action.itemID)
            if (existingIndex >= 0) {
                const updateFavItems = [...state.favouriteItems]
                updateFavItems.splice(existingIndex, 1)
                return { ...state, favouriteItems: updateFavItems}
            } else {
                const favItem = state.userItems.find(item => item.id === action.itemID)
                return {...state, favouriteItems: state.favouriteItems.concat(favItem)}
            }

        default:
            return state
    }
}

export default itemsReducer
