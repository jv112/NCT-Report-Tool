import express from 'express';
const router = express.Router();

import Db from '../Db.js';

// Get all locations
router.get('/', async (req, res) => {
    try {
        const location = await Db.location.getLocationList();
        res.json(location);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get location' });
    }
});

// Add a location
router.post('/', async (req, res) => {
    try {
        const lid = await Db.location.addLocation(req.body);
        res.json(lid);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to add location' });
    }
});

// Increase the count of a location by 1
router.put('/:lid/increase', async (req, res) => {
    try {
        await Db.location.increaseLocationCount(req.params.lid);
        res.json({ message: 'Location count increased' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to increase location count' });
    }
});

// Decrease the count of a location by 1
router.put('/:lid/decrease', async (req, res) => {
    try {
        await Db.location.decreaseLocationCount(req.params.lid);
        res.json({ message: 'Location count decreased' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to decrease location count' });
    }
});

export default router;