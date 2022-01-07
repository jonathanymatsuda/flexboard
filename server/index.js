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

app.get('/api/boards', (req, res, next) => {
  const sql = `
  select *
    from "boards"
    `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/workspaces/:workspaceId/boards', (req, res, next) => {
  const workspaceId = Number(req.params.workspaceId);
  const sql = `
  select *
    from "boards"
  where "workspaceId" = $1
    `;
  const params = [workspaceId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/boards', (req, res, next) => {
  const { title, workspaceId } = req.body;
  if (!title) {
    throw new ClientError(400, 'title is a required field');
  } else if (!workspaceId) {
    throw new ClientError(400, 'workspace must be defined');
  }
  const sql = `
  insert into "boards" ("title", "workspaceId")
  values ($1, $2)
  returning *
  `;
  const params = [title, workspaceId];
  db.query(sql, params)
    .then(result => {
      const board = result.rows[0];
      res.status(201).json(board);
    })
    .catch(err => next(err));
});

app.get('/api/boards/:boardId', (req, res, next) => {
  const boardId = Number(req.params.boardId);
  const sql = `
  select "b".*,
      coalesce(json_agg("l" order by "l"."sortOrder")
      filter (where "l"."listId" is not null), '[]'::json) as "lists"
      from "boards" as "b"
    left join "lists" as "l" using ("boardId")
   where "b"."boardId" = $1
   group by "b"."boardId"
  `;
  const params = [boardId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/lists', (req, res, next) => {
  const { title, boardId, sortOrder } = req.body;
  if (!title) {
    throw new ClientError(400, 'title is a required field');
  } else if (!boardId || !sortOrder) {
    throw new ClientError(400, 'boardId and sortOrder must be defined');
  }
  const sql = `
  insert into "lists" ("title", "boardId", "sortOrder")
  values ($1, $2, $3)
  returning *
  `;
  const params = [title, boardId, sortOrder];
  db.query(sql, params)
    .then(result => {
      const list = result.rows[0];
      res.status(201).json(list);
    })
    .catch(err => next(err));
});

app.patch('/api/listorder', (req, res, next) => {
  const sql = `
  with "newSortOrder" as (
   select "listId",
        (row_number() over ()) - 1 as "sortOrder"
  from unnest($1::integer[]) as "listId"
  )
  update "lists" as "l"
    set "sortOrder" = "nso"."sortOrder"
    from (select * from "newSortOrder") as "nso"
   where "l"."listId" = "nso"."listId"
  `;
  const params = [req.body];
  db.query(sql, params)
    .then(result => {
      res.end();
      // console.log(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/lists/:listId', (req, res, next) => {
  const { sortOrder } = req.body;
  const listId = Number(req.params.listId);
  if (!Number.isInteger(listId) || listId < 0) {
    throw new ClientError(400, 'listId must be a positive integer');
  }
  const sql = `
    update "lists"
      set "sortOrder" = $1
     where "listId" = $2
    returning *
    `;
  const params = [sortOrder, listId];
  db.query(sql, params)
    .then(result => {
      const [list] = result.rows;
      if (!listId) {
        throw new ClientError(404, `cannot find list with listId ${listId}`);
      } else {
        res.status(201).json(list);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
