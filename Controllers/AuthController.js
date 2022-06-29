import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    const newUser = new UserModel(req.body)
    const {username} = req.body
    try {
        const existUser = await UserModel.findOne({username})
        if (existUser) {
            return res.status(400).json({message: "User with this email is already exist"})
        }

        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, process.env.SECRET_KEY, {expiresIn: "1h"})
        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await UserModel.findOne({username: username})
        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id
                }, process.env.SECRET_KEY, {expiresIn: "1h"})
                res.status(200).json({user, token})
            }
        } else {
            res.status(404).json("User not exist")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
