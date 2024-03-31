const express = require('express');
const router = express.Router();

const db = require('../Db');

// Get report by rid
router.get('/:rid', async (req, res) => {
    try {
        const report = await db.report.getReport(req.params.rid);
        res.json(report);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get report' });
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await db.report.getAllReports();
        res.json(reports);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get reports' });
    }
});

// Add a report
router.post('/', async (req, res) => {
    try {
        await db.report.addReport(req.body);
        res.json({ message: 'Report added' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to add report' });
    }
});

// Delete a report
router.delete('/:rid', async (req, res) => {
    try {
        await db.report.removeReport(req.params.rid);
        res.json({ message: 'Report deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

// Close a report
router.put('/close/:rid', async (req, res) => {
    try {
        await db.report.closeReport(req.params.rid);
        res.json({ message: 'Report closed' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to close report' });
    }
});

module.exports = router;