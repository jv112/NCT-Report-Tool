import express from 'express';
const router = express.Router();

import Db from '../Db.js';

// Get report by rid
router.get('/:rid', async (req, res) => {
    try {
        const report = await Db.report.getReport(req.params.rid);
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
        const reports = await Db.report.getAllReports();
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
        await Db.report.addReport(req.body);
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
        await Db.report.removeReport(req.params.rid);
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
        await Db.report.closeReport(req.params.rid);
        res.json({ message: 'Report closed' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to close report' });
    }
});

export default router;