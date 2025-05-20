const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla psychic powers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM psychic_powers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET psychic power by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM psychic_powers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny psychic power
router.post('/', async (req, res) => {
  const { power_name, description, type, character_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO psychic_powers (power_name, description, type, character_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [power_name, description, type, character_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera psychic power
router.put('/:id', async (req, res) => {
  const { power_name, description, type, character_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE psychic_powers SET power_name = $1, description = $2, type = $3, character_id = $4 WHERE id = $5 RETURNING *`,
      [power_name, description, type, character_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE psychic power
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM psychic_powers WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", power: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
