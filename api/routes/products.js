// This file handles all request to products

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import the mongoose schema
const Product = require('../../models/product');

router.get('/', (req, res, next) => {
	Product
		.find()
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

// store the product in the database
router.post('/', (req, res, next) => {
	// create unique id mongoose
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	// store in database
	product
		.save()
		.then(result => {
		console.log(result);
	})
	.catch(err => {console.log(err)});

	res.status(201).json({
		message: "handling POST requests to products",
		created: product
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
	.exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err => {
		res.status(500).json({error: err});
	});
});

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;
	res.status(200).json({
		message: "updated product!",
		id: id
	  });
});

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	res.status(200).json({
		message: "Deleted product!",
		id: id
	  });
});

module.exports = router;