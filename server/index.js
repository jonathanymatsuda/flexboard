require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');

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

app.get('/api/workspaces', (req, res, next) => {
  const sql = `
  select *
    from "workspaces"
   `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/workspaces', (req, res, next) => {
  const { name, description } = req.body;
  if (!name) {
    throw new ClientError(400, 'name is a required field');
  }
  const sql = `
    insert into "workspaces" ("name", "description")
    values ($1, $2)
    returning *
    `;
  const params = [name, description];
  db.query(sql, params)
    .then(result => {
      const workspace = result.rows[0];
      res.status(201).json(workspace);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
