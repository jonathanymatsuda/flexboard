insert into "workspaces" ("name", "description")
values ('Marketing Project', 'A project for my boss regaridng our social media platform'),
       ('Trello Hackathon', 'Come up with cool and absured ideas for the trello platform'),
       ('Engineer Team', 'A place for clickup eng team to manage all existing projects');

insert into "boards" ("title", "workspaceId")
values ('Social Media Update Project', 1),
       ('Creating a mobile app', 2),
       ('Building LinkedIn Presence', 1);

insert into "lists" ("title", "boardId", "sortOrder")
values ('To Do', 1, 0),
       ('In progress', 1, 1),
       ('Complete', 1, 2),
       ('To Do', 2, 2),
       ('In progress', 2, 0),
       ('Finish', 2, 1);

insert into "tasks" ("title", "listId", "priority", "sortOrder")
values ('Task 1', 1, false, 0),
       ('Task 2', 1, false, 1),
       ('Task 3', 2, false, 0),
       ('Task 4', 1, false, 2)
