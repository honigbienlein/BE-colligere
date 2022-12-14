import axios from 'axios'
import 'dotenv/config'
import { Sequelize } from 'sequelize'

const connectingToColligereDB = async () => {
	const sequelize = new Sequelize(
		`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_DATABASE}`,
		{
			pool: {
				max: 1,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
		},
	)
	return sequelize
}

const fetchingBookByISBN = async (isbn = 1491952024) => {
	try {
		const responseOpenLibrary = await axios.get(
			`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
		)
		const data = responseOpenLibrary.data
		const [book] = Object.values(data)

		// console.log(responseOpenLibrary)

		const response = {
			title: book?.title,
			subtitle: book?.subtitle,
			authors: book?.authors?.map(author => author.name),
			pages: book?.number_of_pages,
			isbn_10: book?.identifiers?.isbn_10?.find(() => true),
			isbn_13: book?.identifiers?.isbn_13?.find(() => true),
			publishers: book?.publishers?.map(publisher => publisher.name),
			publish_date: book?.publish_date,
			genre: book?.subjects?.map(subject => subject.name),
			cover: book?.cover?.medium,
		}
		return response
	} catch (error) {
		console.log(error)
		return {}
	}
}

export { connectingToColligereDB, fetchingBookByISBN }
