import express from "express"
import { getUserById, addUser, updateUserById, deleteUserById} from "../controller/user/index.js"
import { getAllCollections, getCollectionById, addCollection, updateCollectionById, deleteCollectionById } from "../controller/collection/index.js"
import { getAllItems, getItemByEntryId, addItem, updateItemByEntryId, deleteItemByEntryId } from "../controller/item/index.js"

const router = express.Router()

router.route('/:id_user/collections/:id_collection/items/:id_entry')
    .get(getItemByEntryId) // get an item of a collection
    .put(updateItemByEntryId) // update an item in a collection
    .delete(deleteItemByEntryId) // delete an item by the entry id

router.route('/:id_user/collections/:id_collection/items')
    .get(getAllItems) // get all items of a collection
    .post(addItem) // post a new item to a collection


router.route('/:id_user/collections/:id_collection')
    .get(getCollectionById) // get information of a collection of a user
    .put(updateCollectionById) // update a collection
    .delete(deleteCollectionById) // delete collection and all the entries

router.route('/:id_user/collections')
    .get(getAllCollections) // get a list of all collections of a user
    .post(addCollection) // post a new collection


router.route('/:id_user')
    .get(getUserById) // get information of a user
    .put(updateUserById) // update information of a user
    .delete(deleteUserById) // delete is do user visible false

router.route('/')
    .post(addUser) // post a new user

export default router