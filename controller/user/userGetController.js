import {connectingToColligereDB} from "../../dbConnections.js"

const user_id = async (req, res) => {
    
    const db = await connectingToColligereDB()
    
    await db.close()
    await res.send(`id_user  =  ${req.params.id_user}`)
}

export default user_id