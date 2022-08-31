import User from "../../models/userModel.js"

const user_post = async (req, res) => {
    const userToAdd = {
        username: req?.body?.username,
        email: req?.body?.email,
        password: req?.body?.password
    }
    try {
        const userInDB = await User.create(userToAdd)
        userInDB.password = ""
        res.send(userInDB)
    } catch (error) {
        res.send(error)
    }
}


export default user_post