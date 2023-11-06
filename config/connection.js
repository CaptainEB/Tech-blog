import 'dotenv/config';
import { Sequelize } from 'sequelize';

let sequelize;
if (process.env.JAWSDB_URL) {
	// If running on Heroku with JawsDB
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	// If running locally or in a different environment
	sequelize = new Sequelize(process.env._SQL_DATABASE, process.env._SQL_NAME, process.env._SQL_PASSWORD, {
		host: 'localhost',
		dialect: 'mysql',
	});
}

// // -----> This is to test the connection to the database
// try {
// 	await sequelize.authenticate();
// 	console.log('Connection has been established successfully.');
// } catch (error) {
// 	console.error('Unable to connect to the database:', error);
// }

export default sequelize;
