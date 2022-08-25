import express from 'express'
import { user_create_post, game_results } from "../controllers/"

const router = express.Router()

router.route('/:id/collections/:id/items/:id')
    .get(users_id_collections_id_items_id) // get an item of a collection
    .put(users_id_collections_id_items_id_put) // update an item in a collection

router.route('/:id/collections/:id/items')
    .get(users_id_collections_id_items) // get all items of a collection
    .post(users_id_collections_id_items_post) // post a new item to a collection

router.route('/:id/collections/:id')
    .get(users_id_collections_id) // get information of a collection of a user
    .put(users_id_collections_id_put) // update a collection

router.route('/:id/collections')
    .get(users_id_collections) // get a list of all collections of a user
    .post(users_id_collections_post) // post a new collection

router.route('/:id')
    .get(users_id) // get information of a user
    .put(users_id_put) // update information of a user

router.route('/')
    .post(users_post) // post a new user

export default router