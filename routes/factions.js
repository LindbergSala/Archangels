const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla factions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM factions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET faction by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM factions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny faction
router.post('/', async (req, res) => {
  const { name, faction_type, allegiance, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO factions (name, faction_type, allegiance, notes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, faction_type, allegiance, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera faction
router.put('/:id', async (req, res) => {
  const { name, faction_type, allegiance, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE factions SET name = $1, faction_type = $2, allegiance = $3, notes = $4 WHERE id = $5 RETURNING *`,
      [name, faction_type, allegiance, notes, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE faction
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM factions WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", faction: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
