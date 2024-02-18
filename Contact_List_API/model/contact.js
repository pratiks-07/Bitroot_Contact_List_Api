const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ContactSchema = new Schema({
    myfile:{type:String},
    name: { type: String, required:true},
    number: { type: [Number], required: true },
})

const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact