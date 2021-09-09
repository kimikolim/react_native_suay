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
            moment(this.dateExpired).format('DD/MM/YYYY'),
            moment(this.datePurchased).format('DD/MM/YYYY')
        )
    }

}

export default Item