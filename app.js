// this file handles express, and routing
// starts our application
// connect to database

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

// import the env file package
require('dotenv').config({path:'./.env.default'});

// connect to database
// connection accounts
const pass = process.env.PASSWORD;
const user = process.env.USER;
const connectionUrl = 'mongodb+srv://'+user+':'+pass+'@node-shop-ohkmc.mongodb.net/test?retryWrites=true';
//const connectionUrl = 'mongodb+srv://node-shop:'+process.env.mongo_atlas+'@node-shop-ohkmc.mongodb.net/test?retryWrites=true'
mongoose.connect(connectionUrl, { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});;

// morgan is used to log information about api requests such as time amount for requests on nodemon
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// fixes CORS issues, prevent CORS Errors
app.use((error, req, res, next)=>{
	// give access to all servers origin
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-COntrol-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// forward to products data url - resource
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//error handling no route is found
app.use((req, res, next)=>{
	// node built in error
	const error = new Error("Not Found");
	error.status = 404;
	// forward error request
	next(error);
});

// handle other errors
app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

module.exports = app;
