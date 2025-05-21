const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla missions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM missions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET mission by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM missions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny mission
router.post('/', async (req, res) => {
  const { mission_name, location, mission_type, mission_date, outcome, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO missions (mission_name, location, mission_type, mission_date, outcome, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [mission_name, location, mission_type, mission_date, outcome, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera mission
router.put('/:id', async (req, res) => {
  const { mission_name, location, mission_type, mission_date, outcome, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE missions SET mission_name = $1, location = $2, mission_type = $3, mission_date = $4, outcome = $5, description = $6 WHERE id = $7 RETURNING *`,
      [mission_name, location, mission_type, mission_date, outcome, description, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE mission
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM missions WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", mission: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
