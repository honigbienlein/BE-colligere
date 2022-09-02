import User from "../../models/userModel.js"

/**
 * @TODO
 *  - password
 *    - check length
 *      - change error message
 *    - crypt
 * 
 * @param {*} request 
 * @param {*} response 
 * 
 */
const user_post = async (request, response) => {
    const usernameCharLength = 3
    const usernameCharLengthFailedText = `Your username is shorter than ${usernameCharLength} chars.`
    const emailLengthFailedText = "Your email is missing."
    const errorMessageUniqueEmailFailed = "Your email is already used."
    const passwordLengthFailedText = "Your password is missing."
    const emptyString = ""

    const userToAdd = {
        username: request?.body?.username,
        email: request?.body?.email,
        password: request?.body?.password
    }

    try {
        const userInDB = await User.create(userToAdd)
        delete userInDB.dataValues.password
        await response.send(userInDB)
    } catch ({errors}) {
        const usernameFailed = !userToAdd.username || userToAdd.username.length<usernameCharLength ? usernameCharLengthFailedText : emptyString
        const emailFailed = !userToAdd.email ? emailLengthFailedText : emptyString
        const passwordFailed = !userToAdd.password ? passwordLengthFailedText : emptyString
        const uniqueEmailFailed = errors[0].message==="email must be unique" ? errorMessageUniqueEmailFailed : emptyString
        
        if(usernameFailed||emailFailed||passwordFailed||uniqueEmailFailed){
            const failedUserToAdd = {...userToAdd} 
            delete failedUserToAdd.password
            await response.send({
                errorMessages:[usernameFailed, emailFailed, passwordFailed, errorMessageUniqueEmailFailed],
                data:{...failedUserToAdd}
            })
        } else {
            response.send(errors)
        }
    }
}


export {
    user_post
}