// Types
import { Iuser } from "../types"

export class CommentClass {

    _id: string
    content: string
    commentBy: Iuser

    constructor(_id: string, content: string, commentBy: Iuser) {
        this._id = _id
        this.content = content
        this.commentBy = commentBy      
    }

    fullName = () => {
        return `${this.commentBy.firstName} ${this.commentBy.lastName}`
    } 

}

