const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla gears
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gears');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET gear by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gears WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST skapa ny gear
router.post('/', async (req, res) => {
    const { name, weapons, armors, special_equipment, relics_artifacts } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO gears (name, weapons, armors, special_equipment, relics_artifacts)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, weapons, armors, special_equipment, relics_artifacts]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT uppdatera gear
router.put('/:id', async (req, res) => {
    const { name, weapons, armors, special_equipment, relics_artifacts } = req.body;
    try {
        const result = await pool.query(
            `UPDATE gears SET name = $1, weapons = $2, armors = $3, special_equipment = $4, relics_artifacts = $5 WHERE id = $6 RETURNING *`,
            [name, weapons, armors, special_equipment, relics_artifacts, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE gear
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM gears WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted", gear: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
