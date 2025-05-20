const express = require('express');
const cors = require('cors');
require('dotenv').config();
const charactersRouter = require('./routes/characters');
const gearRouter = require('./routes/gear');
const squadsRouter = require('./routes/squads');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Koppla routern till din endpoint
app.use('/characters', charactersRouter);
app.use('/squads', squadsRouter);
app.use('/gears', gearRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
