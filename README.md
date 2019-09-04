# Elevate
Human resources for the employee. A full-stack application built in React and Express with a Postgres database.

## Installation

1. Clone this repository
2. cd into the "backend" directory, install required packages, seed database, and start the server

```
cd backend
npm install
psql < data.sql
nodemon server.js 
```
This will start the server on port 3001

3. cd into the "frontend" directory, install required packages, then start the app

```
cd frontend
npm install
npm start
```
This will run the app on http://localhost:3000

- Admin account:
email: admin@gmail.com 
password: secret

## Running Tests

```
cd backend
jest

cd frontend
npm test
```

## Calendly Webhook Configuration and Testing
1. Create [Calendly](https://calendly.com/) account. Note: for the live app Alex will create a single admin/team account to use for configuring the webhook. Each professional (e.g., lawyer, financial advisor, etc) will create their own account, which is associated with the team account. This allows the admin to have an overview of all calendars and each professional to manage their schedule (e.g. set available times for appointments) independently.

2. Follow instructions in Calendly [developer guide](https://developer.calendly.com/).
  * One approach is to use Insomnia to [create a webhook subscription](https://developer.calendly.com/docs/webhook-subscriptions).
  * Once the app is deployed to Heroku (or another live server), use the live URL to create the webhook subscription.
  * Before deployment and/or for local testing, using localhost, the webhook endpoint must be configured as "/" -- see comment on line 11 of /backend/routes/calendlyWebhook -- and then follow local testing instructions below.

### To Test Locally
1. Install [ngrok](https://ngrok.com/)
2. Start local backend server (installation instructions above)
3. Start ngrok `./ngrok http 3001`
4. Use Insomnia to create webhook subscription with your personal Calendly account
5. Front end workflow TBD...

### Local testing notes
* restart local server AND ngrok every time you make a change to code
* establish new webhook with Calendly (via Insomnia); update ngrok URL in the new POST request
* continue testing
