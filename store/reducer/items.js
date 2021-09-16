import ITEMS from '../../data/seed-data'
import Item from '../../models/item'

//import actions from redux actions
import { SET_ITEMS, CREATE_ITEM } from '../action/items'

const initialState = {
    allItems: ITEMS,
    userItems: ITEMS.filter((item) => item.ownerID === "u1")
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return {
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

    }
    return state
}
