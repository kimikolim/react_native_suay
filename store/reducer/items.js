import ITEMS from '../../data/seed-data'

const initialState = {
    allItems: ITEMS,
    userItems: ITEMS.filter((item) => item.ownerID === "u1")
}

export default (state = initialState, action) => {
    return state
}
