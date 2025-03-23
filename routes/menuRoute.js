const express = require('express')
const router = express.Router()
const MenuItems = require('../models/Menu')


router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenuItems = new MenuItems(data)
        const response = await newMenuItems.save()
        res.status(200).json(response)
        console.log('saved');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating menu item' })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItems.find()
        console.log('scusses');
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating menu item' })
    }
})



router.get('/:testeType', async (req, res) => {
    try {
        const testeType = req.params.testeType
        if (testeType === "sweet" || testeType === "spicy" || testeType === "sour") {
            const data = await MenuItems.find({ teste: testeType })
            if (data.length ===0) {
                res.status(404).json({ message: 'No  found with that work type' })
            } else {
                res.status(200).json(data)
            }        }
        else {
            res.status(404).json({ message: 'No  found with that work type' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id
        const UpdateMenu = req.body;

        const response = await MenuItems.findByIdAndUpdate(menuId, UpdateMenu, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ message: 'No menu item found with that id' })
        } else {
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ' })
    }
})

router.delete('/:id', async (req,res)=> {
    try {
        const menuId = req.params.id
        const response = await MenuItems.findByIdAndDelete(menuId)
        if (!response) {
            res.status(404).json({ message: 'No menu item found with that id' })
        } else {
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ' })
    }
})

module.exports = router;