import {connectingToColligereDB} from "../../dbConnections.js"

const user_id_delete = async (req, res) => {

    const db = await connectingToColligereDB()

    res.send("user_id_delete")
}


export default user_id_delete