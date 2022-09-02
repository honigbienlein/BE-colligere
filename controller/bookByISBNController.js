import { fetchingBookByISBN } from '../dbConnections.js'

const getBookFromOpenLibrary = async (request, response) => {
	const isbn = request.params.isbn
	const book = await fetchingBookByISBN(isbn)

	response.send(book)
}

export { getBookFromOpenLibrary as bookByISBN }
