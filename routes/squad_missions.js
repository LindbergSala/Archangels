const express = require('express');
const router = express.Router();
const pool = require('../db');

// Koppla en existerande squad till ett mission
router.post('/', async (req, res) => {
  const { squad_id, mission_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO squad_missions (squad_id, mission_id)
       VALUES ($1, $2) RETURNING *`,
      [squad_id, mission_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET detaljer om ett mission inkl. alla squads (och squad-info)
router.get('/:id/details', async (req, res) => {
  try {
    // Hämta mission-data
    const missionResult = await pool.query('SELECT * FROM missions WHERE id = $1', [req.params.id]);
    if (missionResult.rows.length === 0) return res.status(404).json({ error: "Not found" });

    // Hämta alla squads på missionet, inkl. gear
    const squadsResult = await pool.query(
      `SELECT 
        s.*, 
        g.name AS gear_name, 
        g.weapons, 
        g.armors, 
        g.special_equipment, 
        g.relics_artifacts
      FROM squad_missions sm
      JOIN squads s ON sm.squad_id = s.id
      LEFT JOIN gears g ON s.gear_id = g.id
      WHERE sm.mission_id = $1`,
      [req.params.id]
    );

    // Bygg svaret
    const missionInfo = missionResult.rows[0];
    missionInfo.squads = squadsResult.rows; // en array med squads + gear

    res.json(missionInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/missions', async (req, res) => {
  try {
    // Hämta squad
    const squadResult = await pool.query('SELECT * FROM squads WHERE id = $1', [req.params.id]);
    if (squadResult.rows.length === 0) return res.status(404).json({ error: "Not found" });

    // Hämta missions
    const missionsResult = await pool.query(
      `SELECT m.*
      FROM squad_missions sm
      JOIN missions m ON sm.mission_id = m.id
      WHERE sm.squad_id = $1`,
      [req.params.id]
    );

    // Bygg svar
    const squadInfo = squadResult.rows[0];
    squadInfo.missions = missionsResult.rows;

    res.json(squadInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
