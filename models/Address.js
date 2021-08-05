const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    address: {type: String, required: true},
    nickname: {type: String, required: true},
    currency: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Address', schema)
