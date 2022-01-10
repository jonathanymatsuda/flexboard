insert into "workspaces" ("name", "description")
values ('LFZ Team', 'Space for the LearninigFuze team to collaborate'),
       ('Trello Hackathon', 'Come up with cool and absured ideas for the trello platform'),
       ('ClickUp Engineer Team', 'A place for clickup eng team to manage all existing projects'),
       ('AuditBoard Sales Team', 'AuditBoard Q4 ongoing sales projects'),
       ('Principles of Accounting 2 Class', 'A place to track all my assignments and upcoming tasks'),
       ('Home Remodel', 'Tracking all my different projects and tasks for the home remodel'),
       ('Learn Vue', 'Tracking my progress for learning Vue'),
       ('Smash Bros', 'I want to elite every smash character online');


insert into "boards" ("title", "workspaceId")
values ('Web Dev - Upcoming cohort prep', 1),
       ('Data Science - Upcoming cohort prep', 1),
       ('Administrative Items', 1),
       ('Creating a Mobile Application', 2),
       ('Feature: Ability to drag and drop columns from different workspaces', 2),
       ('Maintaining Salesforce', 4),
       ('Hiring', 4),
       ('Training new reps', 4),
       ('Smash Characters', 8);

insert into "lists" ("title", "boardId", "sortOrder")
values ('To Do', 1, 0),
       ('In progress', 1, 1),
       ('Complete', 1, 2),
       ('To Do', 2, 0),
       ('In progress', 2, 1),
       ('Finish', 2, 2);


insert into "tasks" ("title", "listId", "priority", "sortOrder")
values ('Prepare seating for 15 students', 1, false, 0),
       ('Verify students GitHub', 1, false, 1),
       ('Create slack channel', 1, false, 2),
       ('Create repos', 2, false, 0),
       ('Update title case algo challenge', 3, false, 0);
