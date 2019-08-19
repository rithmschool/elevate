-- seed data for elevate  



-- users table
-- NOTE: users column need more than this, more will be added after meeting with project manager
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 first_name  text NOT NULL, 
last_name text NOT NULL,
phone text NOT NULL UNIQUE,
email  text NOT NULL
);

-- roles table
CREATE TABLE roles (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
admin BOOLEAN NOT NULL DEFAULT false,
coach BOOLEAN NOT NULL DEFAULT false,
financial_advisor BOOLEAN NOT NULL DEFAULT false,
lawyer BOOLEAN NOT NULL DEFAULT false
);

-- appointment table
CREATE TABLE appointments (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES users(id) NOT NULL,
professional_id INTEGER REFERENCES users(id) NOT NULL,
date DATE NOT NULL
);

-- charges table
CREATE TABLE charges (
id SERIAL PRIMARY KEY,
appointment_id INTEGER REFERENCES appointments(id) NOT NULL
-- NOTE: client id and professional id may need to be in columns???
-- client_id INTERGER REFERENCES users(id),
-- date DATE NOT NULL
);

-- messages table
CREATE TABLE messages (
id SERIAL PRIMARY KEY,
sent_to INTEGER REFERENCES users(id) NOT NULL,
sent_from INTEGER REFERENCES users(id) NOT NULL,
body text NOT NULL,
sent_at timestamp with time zone NOT NULL,
read_at timestamp with time zone
);

-- templates table
CREATE TABLE templates (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES users(id) NOT NULL,
professional_id INTEGER REFERENCES users(id) NOT NULL,
body text NOT NULL
);

INSERT INTO 
users (first_name, last_name, phone, email)
VALUES ('Emi','Tsukuda', '1111111111', 'emi@gamailkdkd.com');

INSERT INTO 
users (first_name, last_name, phone, email)
VALUES ('Marisa', 'Henry', '1111111112', 'marisa@gamailkdkd.com');

INSERT INTO 
roles (user_id)
VALUES (1);



