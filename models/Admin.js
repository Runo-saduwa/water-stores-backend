const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
      firstName: String,
      lastName: String,
      email: {
          type: String,
          unique: true,
          required: true,
          match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      },
      password: {
          type: String,
          required: true
      },
      createdAt: {
          type: String,
          default: Date.now
      }
})

const adminModel = mongoose.model('admin', adminSchema)


module.exports = adminModel;