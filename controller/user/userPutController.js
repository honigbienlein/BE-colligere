import dbConnection from "../../dbConnection.js"

const user_id_put = async (req, res) => { 
    
    const db = await dbConnection()

    res.send("users_id_put")
}


export default user_id_put