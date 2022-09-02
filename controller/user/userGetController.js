import User from "../../models/userModel.js"

/**
 * @TODO
 *  - user check
 * 
 * @param {*} request 
 * @param {*} response 
 */
const user_id = async (request, response) => {
    const id_user = request.params.id_user
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
    await response.send(userData)
}

export {
    user_id
}