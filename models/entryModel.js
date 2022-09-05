import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'

const db = await connectingToColligereDB()

const Entry = db.define('Entry', {
	id_entry: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	id_collection: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Collection,
			key: 'id_collection',
		},
	},

	tableName: 'Entries',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})

export default Entry
