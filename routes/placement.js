const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla placements
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM placement');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET placement by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM placement WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST skapa ny placement
router.post('/', async (req, res) => {
    const { company, squad, specialization, nr_missions } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO placement (company, squad, specialization, nr_missions)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [company, squad, specialization, nr_missions]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT uppdatera placement
router.put('/:id', async (req, res) => {
    const { company, squad, specialization, nr_missions } = req.body;
    try {
        const result = await pool.query(
            `UPDATE placement SET company = $1, squad = $2, specialization = $3, nr_missions = $4 WHERE id = $5 RETURNING *`,
            [company, squad, specialization, nr_missions, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE placement
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM placement WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted", placement: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
