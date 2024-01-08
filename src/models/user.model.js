import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import {privateKey} from '../utils/keypairs'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avator: {
        type: String, //cloudinary url
        required: true

    },
    coverImage: {
        type: String, //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10)
        next()
    }else {
        next()
    }
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userSchema: this.username,
            fullname: this.fullname
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model("User", userSchema)