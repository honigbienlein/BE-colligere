
import express from "express"
import { bookByISBN } from "../controller/bookByISBNController.js"

const router = express.Router()

router.route('/:isbn')
    .get(bookByISBN)

export default router