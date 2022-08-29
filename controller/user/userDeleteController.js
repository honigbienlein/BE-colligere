import dbConnection from "../../dbConnection.js"

const user_id_delete = async (req, res) => {

    const db = await dbConnection()

    res.send("user_id_delete")
}


export default user_id_delete