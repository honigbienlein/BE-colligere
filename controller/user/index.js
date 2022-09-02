import { user_id } from './userGetController.js'
import { user_post } from './userPostController.js'
import { user_id_put } from './userPutController.js'
import { user_id_delete } from './userDeleteController.js'

export {
	user_id as getUserById,
	user_post as addUser,
	user_id_put as updateUserById,
	user_id_delete as deleteUserById,
}
