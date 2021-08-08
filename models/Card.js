const {Schema, model, Types} = require('mongoose')

const cardSchema = new Schema({
    cardTitle: {type: String, required: true, unique: false},
    selectedArray: [{type: Types.ObjectId, ref: "Address"}],
    description: {type: String, required: false, unique: false},
    cardLink: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Card', cardSchema)
