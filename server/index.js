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
  }
  if (!boardId) {
    throw new ClientError(400, 'board must be defined');
  }
  if (sortOrder === undefined) {
    throw new ClientError(400, 'sortOrder is a required field');
  }
  if (!Number.isInteger(sortOrder)) {
    throw new ClientError(400, 'sortOrder must be an integer');
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
    })
    .catch(err => next(err));
});

app.get('/api/list/:listId', (req, res, next) => {
  const listId = Number(req.params.listId);
  const sql = `
  select "l".*,
      coalesce(json_agg("t" order by "t"."sortOrder")
      filter (where "t"."taskId" is not null), '[]'::json) as "tasks"
      from "lists" as "l"
    left join "tasks" as "t" using ("listId")
   where "l"."listId" = $1
   group by "l"."listId"
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/tasks', (req, res, next) => {
  const { title, listId, sortOrder, priority = false } = req.body;
  if (!title) {
    throw new ClientError(400, 'title is a required field');
  }
  if (!listId) {
    throw new ClientError(400, 'list must be defined');
  }
  if (sortOrder === undefined) {
    throw new ClientError(400, 'sortOrder is a required field');
  }
  if (!Number.isInteger(sortOrder)) {
    throw new ClientError(400, 'sortOrder must be an integer');
  }
  if (typeof priority !== 'boolean') {
    throw new ClientError(400, 'priority (boolean) is a required field');
  }
  const sql = `
  insert into "tasks" ("title", "listId", "sortOrder", "priority")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [title, listId, sortOrder, priority];
  db.query(sql, params)
    .then(result => {
      const list = result.rows[0];
      res.status(201).json(list);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
