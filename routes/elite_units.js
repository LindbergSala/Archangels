const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla elite units
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM elite_units');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET elite unit by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM elite_units WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny elite unit
router.post('/', async (req, res) => {
  const { unit_name, captain, specialization, unique_gear, nr_missions } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO elite_units (unit_name, captain, specialization, unique_gear, nr_missions)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [unit_name, captain, specialization, unique_gear, nr_missions]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera elite unit
router.put('/:id', async (req, res) => {
  const { unit_name, captain, specialization, unique_gear, nr_missions } = req.body;
  try {
    const result = await pool.query(
      `UPDATE elite_units SET unit_name = $1, captain = $2, specialization = $3, unique_gear = $4, nr_missions = $5 WHERE id = $6 RETURNING *`,
      [unit_name, captain, specialization, unique_gear, nr_missions, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE elite unit
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM elite_units WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", unit: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
