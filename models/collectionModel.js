import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'
import User from './userModel.js'

const db = await connectingToColligereDB()

const Collection = db.define(
	'Collection',
	{
		id_collection: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id_user',
			},
		},
		id_template: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 1,
		},
		name_collection: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'Collections',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
)

export default Collection
