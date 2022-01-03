insert into "workspaces" ("name", "description")
values ('Marketing Project', 'A project for my boss regaridng our social media platform'),
       ('Trello Hackathon', 'Come up with cool and absured ideas for the trello platform'),
       ('Engineer Team', 'A place for company A eng team to manage all existing projects');

insert into "boards" ("title", "workspaceId")
values ('Project A', 1),
       ('Project B', 2),
       ('Project C', 1);
