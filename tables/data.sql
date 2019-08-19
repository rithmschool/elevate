CREATE TABLE users(
    id serial PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone BIGINT NOT NULL,
    company TEXT,
    job_title TEXT NOT NULL,
    date_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE roles(
     id serial PRIMARY KEY,
     role TEXT NOT NULL
);

CREATE TABLE professionals(
     id serial PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
     role_primary INTEGER NULL REFERENCES roles ON DELETE CASCADE,
     role_secondary TEXT NULL
);

CREATE TABLE charges(
    id serial PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES professionals ON DELETE CASCADE,
    amount_due INTEGER NOT NULL,
    payment_added_time_stamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    payed_time_stamp INTEGER null
    
);

CREATE TABLE messages(
    id serial PRIMARY KEY, 
    user_from INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    user_to INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    message_details TEXT NOT NULL,
    time_stamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE template ( 
    id serial PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE, 
    title TEXT NOT NULL,
    details TEXT NOT NULL,
    category TEXT NOT NULL
);


CREATE TABLE appointments (
    id serial PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES professionals ON DELETE CASCADE,
    professional_id INTEGER NOT NULL REFERENCES professionals ON DELETE CASCADE,
    appt_date INTEGER Null,
    time_stamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    payment_due INTEGER NUll
);

CREATE TABLE availabilty (
    id serial PRIMARY KEY,
    professional_id INTEGER NOT NULL REFERENCES professionals ON DELETE CASCADE,
    date INTEGER NOT NULL
)

