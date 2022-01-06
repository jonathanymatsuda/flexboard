insert into "workspaces" ("name", "description")
values ('Marketing Project', 'A project for my boss regaridng our social media platform'),
       ('Trello Hackathon', 'Come up with cool and absured ideas for the trello platform'),
       ('Engineer Team', 'A place for clickup eng team to manage all existing projects');

insert into "boards" ("title", "workspaceId")
values ('Project A', 1),
       ('Project B', 2),
       ('Project C', 1);

insert into "lists" ("title", "boardId", "sortOrder")
values ('To Do', 1, 0),
       ('In progress', 1, 1),
       ('Complete', 1, 2),
       ('Backlog', 1, 3),
       ('To Do', 2, 2),
       ('In progress', 2, 0),
       ('Finish', 2, 1);
