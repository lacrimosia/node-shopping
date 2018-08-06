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
			if(result.length >= 0){
				res.status(200).json(result);
			}else{
				res.status(200).json({
					message: "No entries found"
				});
			}	
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
		price: req.body.price,
		image: req.body.image
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
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Product
		.update({
			_id: id
		}, {$set: updateOps})
		.exec()
		.then(results => {
			console.log(results);
			res.status(200).json({
				message: "Product successfully updated"
			});
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.remove({
		_id: id
	})
	.exec()
	.then(result => {
		res.status(200).json({
			"message": "Product successfully deleted"
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;