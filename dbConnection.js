import "dotenv/config"
import { Sequelize } from "sequelize"

const dbConnection = async () => {
    const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_DATABASE}`)
    
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        return sequelize    
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default dbConnection