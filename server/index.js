require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/workspaces', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({
      error: 'name is a required field'
    });
    const sql = `
    insert into "workspaces: ("name", "description")
    values ($1, $2)
    returning *
    `;
    const params = [name, description];
    db.query(sql, params)
      .then(result => {
        const workspace = result.rows[0];
        res.status(201).json(workspace);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'an unexpected error occurred' });
      });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
