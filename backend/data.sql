DROP DATABASE IF EXISTS "elevate";

CREATE DATABASE "elevate";

\c "elevate"

CREATE TABLE users(
                    username TEXT PRIMARY KEY, 
                    first_name TEXT NOT NULL, 
                    last_name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE, 
                    phone_number INT UNIQUE,
                    profile_pic TEXT,
                    password TEXT NOT NULL,
                    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
                    );


CREATE TABLE roles(
                   id SERIAL PRIMARY KEY,
                   user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
                   admin BOOLEAN  DEFAULT false,
                   lawyer BOOLEAN DEFAULT false,
                   coach BOOLEAN DEFAULT false,
                   financial BOOLEAN DEFAULT false,
                   advisor BOOLEAN DEFAULT false,
                   employee BOOLEAN DEFAULT true
                  );

CREATE TABLE charges(
                     id SERIAL PRIMARY KEY,
                     user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
                     amount FLOAT DEFAULT 00.00,
                     paid_amount FLOAT DEFAULT 00.00,
                     paid BOOLEAN DEFAULT false,
                     description TEXT NOT NULL
                     );

CREATE TABLE messages(
                      id SERIAL PRIMARY KEY,
                      from_username TEXT NOT NULL REFERENCES users,
                      to_username TEXT NOT NULL REFERENCES users,
                      title TEXT NOT NULL,
                      body TEXT NOT NULL,
                      sent_at timestamp with time zone,
                      read_at timestamp with time zone
                      );

CREATE TABLE appointments(
                          id SERIAL PRIMARY KEY,
                          user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
                          description TEXT NOT NULL,
                          date timestamp with time zone
                          );

CREATE TABLE templates(
                       id SERIAL PRIMARY KEY,
                       content TEXT NOT NULL
                       );


INSERT INTO users (username, first_name, last_name, email, phone_number, profile_pic, password) VALUES
                  ('firstuser', 'first user', 'first user', 'firstuser@gmail.com', 43345678, 'http://photo.com/1.jpg', 'password'),
                  ('seconduser', 'second user', 'second user', 'seconduser@gmail.com', 56789043, 'http://photo.com/2.jpg', 'password');

INSERT INTO roles(user_id) VALUES
                 ('firstuser'),
                 ('seconduser');

INSERT INTO charges(user_id, amount, paid_amount, paid, description) VALUES
                   ('seconduser', 20.00, 10.00, false, 'advices received'),
                   ('seconduser', 30.00, 20.00, false, 'advices received');

INSERT INTO messages(from_username, to_username, title, body) VALUES
                    ('firstuser','seconduser', 'need an advice', 'hi how are you? coulf you please give me your opinion about this..');

INSERT INTO appointments(user_id, description) VALUES
                        ('firstuser','some claims');

INSERT INTO templates(content) VALUES
                     ('some templates');
