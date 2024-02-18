const express = require('express')
const router = express.Router()
const Contact = require('../model/contact')


router.get('/contacts', async (req, res) => {
    try{
        const data = await Contact.find({});
        console.log(data)
        res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getbyName
///contacts/:name
//http://localhost:6500/api/contacts/akshay
router.get('/contacts/:name', async (req, res) => {
    try {
        const name = req.params.name
        const data = await Contact.find({name:name});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//getbyContact
///contacts/:contact
//http://localhost:6500/api/contacts/9168270670
router.get('/contacts/get/:contact', async (req, res) => {
    try {
        const contact = parseInt(req.params.contact)
        const hasContact = await Contact.findOne({ contact: contact})
        if (hasContact)
        {
            res.json(hasContact)
        }
        else
        {
            return res.status(404).json({message: "Contact not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


router.post('/contacts', async (req, res) => {
    const existingContact = await Contact.findOne({ contact: req.body.contact })
    if (existingContact)
    {
        return res.status(409).json({message: "Contact already exists"})
    }
    const data = new Contact({
        myfile:req.body.myfile,
        name: req.body.name,
        contact: req.body.contact
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id
    const foundContact = await Contact.findOne({ _id: id })
    if (!foundContact)
    {
        res.send(`Document with id : ${id} is not in the contat list, Please create one.`)
    }
    try
    {
        const data = await Contact.findByIdAndDelete({_id:id})
        res.send(`Document with ${foundContact.name} has been deleted`)
    }
    catch (error)
    {
        res.status(500).json({ message: error.message })
    }
})


router.put('/contacts/:id', async (req, res)=>
{
    const id = req.params.id
    const foundContact = await Contact.findOne({ _id: id })
    try
    {
        if (foundContact)
        {
            const updatedData = req.body;
            const options = { new: true };
            const result = await  Contact.findByIdAndUpdate(
               id, updatedData, options
            )
            res.send(result)
        }
        else
        {
            res.send(`Document with id : ${id} is not in the contact list, Please create one.`)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router