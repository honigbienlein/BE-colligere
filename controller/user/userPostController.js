import dbConnection from "../../dbConnection.js"

const user_post = async (req, res) => {
    const db = await dbConnection()
    
    res.send("users_post")
}


export default user_post