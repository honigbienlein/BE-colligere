import {connectingToColligereDB} from "../../dbConnections.js"

const user_post = async (req, res) => {
    const db = await connectingToColligereDB()
    
    res.send("users_post")
}


export default user_post