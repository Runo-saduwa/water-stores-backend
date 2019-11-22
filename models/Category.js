const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    parent: { type: String },
    createdAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    updatedAt: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
})


const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;