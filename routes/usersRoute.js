import express from "express"
import { user_post, user_id_delete, user_id_put, user_id} from "../controller/user/index.js"

const router = express.Router()
/* 
router.route('/:id_user/collections/:id_collection/items/:id_item')
    .get(users_id_collections_id_items_id) // get an item of a collection
    .put(users_id_collections_id_items_id_put) // update an item in a collection
 */
/* 
router.route('/:id_user/collections/:id_collection/items')
    .get(users_id_collections_id_items) // get all items of a collection
    .post(users_id_collections_id_items_post) // post a new item to a collection
 */
/* 
router.route('/:id_user/collections/:id_collection')
    .get(users_id_collections_id) // get information of a collection of a user
    .put(users_id_collections_id_put) // update a collection
 */
/* 
router.route('/:id_user/collections')
    .get(users_id_collections) // get a list of all collections of a user
    .post(users_id_collections_post) // post a new collection
 */

router.route('/:id_user')
    .get(user_id) // get information of a user
    .put(user_id_put) // update information of a user
    .delete(user_id_delete) // delete is do user visible false

router.route('/')
    .post(user_post) // post a new user

export default router