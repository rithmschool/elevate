-- Create admin user
INSERT INTO users (username,hashed_password, first_name, last_name, email, phone, company, job_title, admin)
VALUES (
    'test username',
    'test_password',
    'Testname',
    'Testerson',
    'test@test.com',
    '18002134453',
    'Rithm',
    'Software Engineer',
    'True'
);
-- Create client user
INSERT INTO users (username,hashed_password, first_name, last_name, email, phone, company, job_title)
VALUES (
    'IAmTest',
    'test_password',
    'Tested',
    'Test Lastname',
    'test@test.org',
    '17268765432',
    'Rithm',
    'Software Developer'
);

-- Create professional user
INSERT INTO users (username,hashed_password, first_name, last_name, email, phone, company, job_title)
VALUES (
    'ProfessionalLawyer',
    'test_password',
    'Lawyer',
    'Last',
    'law@law.org',
    '18002137474',
    'Law Inc.',
    'Lawyer'
);

-- Create Roles
INSERT INTO roles (role)
VALUES (
    'Lawyer'
);

INSERT INTO roles (role)
VALUES (
    'Coach'
);

INSERT INTO roles (role)
VALUES (
    'Financial Advisor'
);
-- Create Professional

INSERT INTO professionals (user_id, role_primary)
VALUES (
    '3',
    '2'
);

--Create Charges
INSERT INTO charges (client_id,professional_id, amount_due, payed_time_stamp)
VALUES(
    '3',
    '1',
    '20',
    '081919'
);
INSERT INTO charges (client_id,professional_id, amount_due, payed_time_stamp)
VALUES(
    '2',
    '1',
    '50',
    '081919'
);
--Create messages
INSERT INTO messages (user_from,user_to, message_details)
VALUES(
    '1',
    '1',
    'hello this a test'
);
INSERT INTO messages (user_from,user_to, message_details)
VALUES(
    '2',
    '1',
    'hello this a test again'
);
--create template
INSERT INTO template(admin_id,title,details,category)
VALUES(
    '4',
    'Test template',
    'testy',
    'lawyer'
);
--create appt
INSERT INTO appointments(client_id,professional_id,appt_date,payment_due)
VALUES(
    '1',
    '1',
    '032919',
    '29'
);
--create availablilty
INSERT INTO availabilty(professional_id,date)
VALUES(
    '1',
    '022319'
);



