import SequelizeStoreConstructor from 'connect-session-sequelize';
import 'dotenv/config';
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/connection.js';
import routes from './controllers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = SequelizeStoreConstructor(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: process.env._SESSION_SECRET,
		cookie: {},
		resave: false,
		saveUninitialized: false,
		store: new SequelizeStore({
			db: sequelize,
		}),
	})
);

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
