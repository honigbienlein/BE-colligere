import User from "../../models/userModel.js"

/**
 * @TODO
 *  - user check
 * 
 * @param {*} req 
 * @param {*} res 
 */
const user_id = async (req, res) => {
    const id_user = req.params.id_user
    const userData = await User.findOne({
        where:{
            id_user:id_user
        },
        attributes:[
            'id_user',
            'username',
            'email',
            'created_at',
            'visible',
            'verified_email'
        ]
    })
    await res.send(userData)
}

export {
    user_id
}