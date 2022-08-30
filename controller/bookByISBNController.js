import { fetchingBookByISBN } from "../dbConnections.js"

const getBookFromOpenLibrary = async (req, res) => { 
    const isbn = req.params.isbn
    const response = await fetchingBookByISBN(isbn)

    res.send(response)
}


export {
    getBookFromOpenLibrary as bookByISBN
}