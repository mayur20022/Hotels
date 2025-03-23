const express = require('express')
const router = express.Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save()
        res.status(200).json(response)
        console.log('saved');

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating person' })
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Person.find()
        console.log('scusses');
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching persons' })
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === "chef" || workType === "manager" || workType === "waiter") {
            const data = await Person.find({ work: workType })
            if (data.length === 0) {
                res.status(404).json({ message: 'No persons found with that work type' })
            } else {
                res.status(200).json(data)
            }
        } else {
            res.status(404).json({ message: 'No persons found with that work type' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Error fetching persons' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id
        const Updateperrson = req.body

        const response = await Person.findByIdAndUpdate(personId, Updateperrson, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ message: 'No person found with that id' })
        } else {
            res.status(200).json(response)
        }

    } catch (error) {
        res.status(500).json({ message: 'Error fetching persons' })

    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id

        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            res.status(404).json({ message: 'No person found with that id' })
        } else {
            res.status(200).json(response)
            }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching persons' })
    }
})







module.exports = router;