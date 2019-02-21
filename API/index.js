const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/recipe', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once('open', () => {
	console.log('Connected to DB');
});
db.on('error', (err) => {
	console.log(err);
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('UI'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

// route middleware
app.use('/api/v1', bookRoutes);

// error handler
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};

	res.status(err.status || 500).json({
		error: {
			message: error.message
		}
	});
});

// access port
const PORT = 3000;
app.listen(PORT, () => {
	console.log('You are now connected');
});
