// sign up and login user
import * as Mongoose from 'mongoose'

// interface IUser extends Mongoose.Document {
//     username: string
//     email: string
//     password: string
// }

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    cName: {
        type: String,
    },
    eName: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    star: {
        type: Array,
        default: [],
    },
    starCount: {
        type: Number,
        default: 0,
    },
    stared: {
        type: Array,
        default: [],
    },
    staredCount: {
        type: Number,
        default: 0,
    },
    visit: {
        type: Number,
        default: 0,
    },
    isUpdated: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const UserModel = Mongoose.model('User', UserSchema)

module.exports = UserModel
