const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            price: { type: Number, required: true},
            quantity: Number
        }
    ],
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' },
    orderDate: { type: Date, default: Date.now() },
    paymentType: String,
    paymentStatus: String,
    isOrderCompleted: { type: Boolean, default: false }
})


const orderModel = mongoose.model('order', orderSchema);


module.exports = orderModel;
