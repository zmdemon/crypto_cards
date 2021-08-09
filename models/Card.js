const {Schema, model, Types} = require('mongoose')

const cardSchema = new Schema({
    cardTitle: {type: String, required: true, unique: false},
    selectedArray: Array,
    description: {type: String, required: false, unique: false},
    addresses: Array,
    cardLink: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Card', cardSchema)
