set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."workspaces" (
	"workspaceId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT,
	"createdAt" timestamp with time zone not null default now(),
	CONSTRAINT "workspaces_pk" PRIMARY KEY ("workspaceId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."boards" (
	"boardId" serial NOT NULL,
	"workspaceId" int NOT NULL,
	"title" TEXT NOT NULL,
	CONSTRAINT "boards_pk" PRIMARY KEY ("boardId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."lists" (
	"listId" serial NOT NULL,
	"boardId" int NOT NULL,
	"title" TEXT NOT NULL,
	"sortOrder" int NOT NULL,
	CONSTRAINT "lists_pk" PRIMARY KEY ("listId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tasks" (
	"taskId" serial NOT NULL,
	"listId" int NOT NULL,
	"title" TEXT NOT NULL,
	"priority" BOOLEAN NOT NULL,
	"sortOrder" int NOT NULL,
	CONSTRAINT "tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "boards" ADD CONSTRAINT "boards_fk0" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("workspaceId");

ALTER TABLE "lists" ADD CONSTRAINT "lists_fk0" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId");

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("listId") REFERENCES "lists"("listId");
