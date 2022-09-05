import { users_id_collections, users_id_collections_id } from './collectionGetController.js'
import { users_id_collections_post } from './collectionPostController.js'
import { users_id_collections_id_put } from './collectionPutController.js'
import { users_id_collections_id_delete } from './collectionDeleteController.js'

export {
	users_id_collections as getCollections,
	users_id_collections_id as getCollectionById,
	users_id_collections_post as addCollection,
	users_id_collections_id_put as updateCollectionById,
	users_id_collections_id_delete as deleteCollectionById,
}
