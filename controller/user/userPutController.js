import {connectingToColligereDB} from "../../dbConnections.js"

const user_id_put = async (req, res) => { 
    
    const db = await connectingToColligereDB()

    res.send("users_id_put")
}


export default user_id_put