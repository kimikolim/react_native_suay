import moment from "moment"

class Item {
    constructor(id, ownerID, title, imgURL, description, price, datePurchased, dateExpired) {
        this.id = id
        this.ownerID = ownerID
        this.title = title
        this.imgURL = imgURL
        this.description = description
        this.price = price
        this.datePurchased = datePurchased
        this.dateExpired = dateExpired
    }

    get readableDate() {
        return (
            moment(this.dateExpired).format('DDMMYYYY'),
            moment(this.datePurchased).format('DDMMYYYY')
        )
    }

}

export default Item