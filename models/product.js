const mongoose = require('mongoose');

// layout the object schema
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	price: Number,
	image: String
});


module.exports = mongoose.model('Product', productSchema);