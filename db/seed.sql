use employeeTracker_DB;

INSERT INTO department
    (name)
VALUES
    ('Product Development'),
    ('Packaging'),
    ('Innovation'),
    ('Microbiology');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Associate Scientist', 80000, 'Product Development'),
    ('Scientist', 95000, 'Product Development'),
    ('Senior Scientist', 125000, 'Product Development'),
    ('Microbiologist', 115000, 'Microbiology'),
    ('Senior Microbiologist', 140000, 'Microbiology'),
    ('Associate Engineer', 100000, 'Packaging'),
    ('Engineer', 150000, 'Packaging'),
    ('Innovator', 125000, 'Innovation');

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Cindy', 'Test', 'Associate Scientist', 1),
    ('Leo', 'Freeman', 'Scientist', 1),
    ('Tania', 'Johnson', 'Senior Scientist', 1),
    ('George', 'Lucas', 'Senior Microbiologist', 2),
    ('Dan', 'Brown', 'Microbiologist', 2),
    ('Marge', 'Simpson', 'Associate Engineer', 3),
    ('Billy', 'Porter', 'Engineer', 3),
    ('Nina', 'Hall', 'Innovator', 4);