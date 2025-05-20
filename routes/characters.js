const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET alla characters
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM characters');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET character by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM characters WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST skapa ny character (squad_id kan vara null)
router.post('/', async (req, res) => {
  const { name, title, race, faction, psyker, status, squad_id, gear_id, specializt } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO characters (name, title, race, faction, psyker, status, squad_id, gear_id, specializt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, title, race, faction, psyker, status, squad_id, gear_id, specializt]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT uppdatera character (squad_id kan vara null)
router.put('/:id', async (req, res) => {
  const { name, title, race, faction, psyker, status, squad_id, gear_id, specializt } = req.body;
  try {
    const result = await pool.query(
      `UPDATE characters SET name = $1, title = $2, race = $3, faction = $4, psyker = $5, status = $6, squad_id = $7, gear_id = $8, specializt = $9 WHERE id = $10 RETURNING *`,
      [name, title, race, faction, psyker, status, squad_id, gear_id, specializt, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE character
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM characters WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", character: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET detailed character info by ID (inklusive squads och gear)
router.get('/:id/details', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
          c.*,
          s.company AS squad_company,
          s.name AS squad_name,
          s.specialization AS squad_specialization,
          s.nr_missions AS squad_nr_missions,
          g.name AS gear_name,
          g.weapons AS gear_weapons,
          g.armors AS gear_armors,
          g.special_equipment AS gear_special_equipment,
          g.relics_artifacts AS gear_relics_artifacts
        FROM characters c
        LEFT JOIN squads s ON c.squad_id = s.id
        LEFT JOIN gears g ON c.gear_id = g.id
        WHERE c.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
