## Backend installation and testing
- Download the repository and navigate to the backend directory
- To seed the database, run `psql < data.sql` in the terminal
- To start the server, run `npm start` in the terminal
- To run tests, run `npm test`

To change a user to admin in sql:
(id = the user_id)
Example:
UPDATE USERS
SET is_admin = 't' 
WHERE id=8;
