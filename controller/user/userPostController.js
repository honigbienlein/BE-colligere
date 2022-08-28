import { Sequelize } from "sequelize"

const users_post = (req, res) => {

    const sequelize = new Sequelize()

    res.send("users_post")
}


export {
    users_post
}