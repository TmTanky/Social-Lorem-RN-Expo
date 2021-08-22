export class LikeClass {

    _id: string
    username: string
    firstName: string
    lastName: string

    constructor(_id: string, username: string, firstName: string, lastName: string) {
        this._id = _id
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
    }

    fullName = () => {
        return `${this.firstName} ${this.lastName}`
    } 


}