const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla logs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET log by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny log
router.post('/', async (req, res) => {
  const { entry_date, entry_title, entry_text, related_mission_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO logs (entry_date, entry_title, entry_text, related_mission_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [entry_date, entry_title, entry_text, related_mission_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera log
router.put('/:id', async (req, res) => {
  const { entry_date, entry_title, entry_text, related_mission_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE logs SET entry_date = $1, entry_title = $2, entry_text = $3, related_mission_id = $4 WHERE id = $5 RETURNING *`,
      [entry_date, entry_title, entry_text, related_mission_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE log
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM logs WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", log: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
