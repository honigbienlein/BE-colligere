import dbConnection from "../../dbConnection.js"

const users_id = async (req, res) => {
    
    const db = await dbConnection()
    
    await db.close()
    await res.send(`id_user  =  ${req.params.id_user}`)
}

export {
    users_id
}