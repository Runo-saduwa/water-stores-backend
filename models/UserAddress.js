const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAddressSchema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	address: [
		{
			fullName: { type: String, required: true },
			mobileNumber: { type: Number, required: true },
			pinCode: { type: Number, required: true },
			locality: { type: String, required: true },
			address: { type: String, required: true },
			cityDistrictTown: { type: String, required: true },
			state: { type: String, required: true },
			landmark: String,
			alternatePhoneNumber: Number
		}
	]
});

const userAddressModel = mongoose.model('userAddres', userAddressSchema);

module.exports = userAddressModel;
