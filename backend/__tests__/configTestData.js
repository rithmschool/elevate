const inputPassword = "test";
const inputEmail = "test@gmail.com";
const inputAdminPassword = "admin123";
const inputAdminEmail = "admin@gmail.com"

const USER_DATA = [
  {email: 'testuser@gmail.com', password: 'password123', first_name: 'Test', last_name: 'User'},
  {email: 'admin@gmail.com', password: 'admin123', first_name: 'Admin', last_name: 'User'},
  {email: 'nate@gmail.com', password: 'nate123', first_name: 'Nate', last_name: 'Lipp'},
  {email: 'elie@gmail.com', password: 'elie123', first_name: 'Elie', last_name: 'Schoppik'},
  {email: 'joel@gmail.com', password: 'joel123', first_name: 'Joel', last_name: 'Burton'},
]

const SALARY_DATA = [
  {user_id: 1, salary: 150000.00, bonus:25000.00,  equity: .001},
  {user_id: 2, salary: 100000.00, bonus:5000.00,  equity: .005},
  {user_id: 3, salary: 90000.00, bonus:2000.00,  equity: .0035},
  {user_id: 4, salary: 200000.00, bonus:5000.00,  equity: .33},
  {user_id: 5, salary: 200000.00, bonus:5000.00,  equity: .10},
]

const CHARGE_DATA = [
  {user_id: 1, amount: 500.00, description: 'Percentage of negotiation salary.',  due_date: '2020-10-02'},
  {user_id: 3, amount: 1000.99, description: 'Percentage of negotiation salary.',  due_date: '2020-09-01'},
  {user_id: 3, amount: 500.00, description: 'Percentage of negotiation salary.',  due_date: '2020-08-23'},
  {user_id: 4, amount: 750.00, description: 'Percentage of negotiation salary.',  due_date: '2020-11-13'},
  {user_id: 5, amount: 1000.00, description: 'Percentage of negotiation salary.',  due_date: '2020-12-28'},
]

const APPOINTMENTS_DATA = [
  {user_id: 3, event_id: 'BCHFF2F62BWNJVPP', calendly_user_id: 'ABCFF2F62BWNJVPP',  created_at: '2020-08-29T09:15:00-07:00', event_type: 'One-on-One', event_type_name: '30 Minute Meeting', reason: 'legal advice', admin_notes: null, start_time:'2020-08-31T09:15:00-07:00'},
  {user_id: 3, event_id: 'GCIEBYAHGKWNENHS', calendly_user_id: 'BCHFF2F62BWNJVPP',  created_at: '2020-08-27T14:00:29-07:00', event_type: 'One-on-One', event_type_name: '15 Minute Meeting', reason: 'consult with a lawyer', admin_notes: null, start_time:'2020-08-30T14:00:29-07:00'},
  {user_id: 3, event_id: 'AAFOAUQKKVOBSZVD', calendly_user_id: 'BCHFF2F62BWNJVPP',  created_at: '2020-08-27T16:30:00-07:00', event_type: 'One-on-One', event_type_name: '30 Minute Meeting',reason:'negotiate my salary',admin_notes: null, start_time:'2020-09-02T16:30:00-07:00',},
  {user_id: 4, event_id:'EGMBBYHHDUZTVUKA', calendly_user_id:  'BCHFF2F62BWNJVPP',  created_at:  '2020-08-27T12:01:01-07:00', event_type: 'One-on-One', event_type_name: '60 Minute Meeting',reason:'legal advice', admin_notes: null, start_time:'2020-08-29T16:30:00-07:00'},
  {user_id: 5, event_id: 'FDLGUGK6SOB54B3G', calendly_user_id: 'BCHFF2F62BWNJVPP',  created_at: '2020-08-27T14:00:29-07:00', event_type: 'One-on-One', event_type_name:'30 Minute Meeting',reason:'consult with a lawyer', admin_notes: null, start_time:'2020-08-27T14:00:29-07:00'},
]


const SEED_APPT_SQL = `
INSERT INTO appointments (user_id, event_id, calendly_user_id, created_at, event_type, event_type_name, reason, admin_notes, start_time, start_time_pretty, end_time, end_time_pretty, location, canceled, canceler_name, cancel_reason, canceled_at, old_event_id, new_event_id) VALUES
  (3, 'BCHFF2F62BWNJVPP', 'ABCFF2F62BWNJVPP', '2020-08-29T09:15:00-07:00', 'One-on-One', '30 Minute Meeting', 'legal advice', null, '2020-08-31T09:15:00-07:00', '09:15 am - Saturday, August 31, 2020', '2020-08-31T09:45:00-07:00','09:45 am - Saturday, August 31, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'GCIEBYAHGKWNENHS', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '15 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T14:00:29-07:00','02:00 pm - Friday, August 30, 2020', '2020-08-30T14:15:29-07:00', '02:15 pm - Friday, August 30, 2020', 'Zoom', false, null, null, null, null, null),
  (3, 'AAFOAUQKKVOBSZVD', 'BCHFF2F62BWNJVPP', '2020-08-27T16:30:00-07:00', 'One-on-One', '30 Minute Meeting', 'negotiate my salary', null, '2020-09-02T16:30:00-07:00', '04:30 pm - Moday, September 2, 2020', '2020-09-02T17:00:00-07:00',  '05:00 pm - Moday, September 2, 2020','Zoom', false, null, null, null, null, null),
  (4, 'EGMBBYHHDUZTVUKA', 'BCHFF2F62BWNJVPP', '2020-08-27T12:01:01-07:00', 'One-on-One', '60 Minute Meeting', 'legal advice', null, '2020-08-29T16:30:00-07:00', '04:30 pm - Thursday, August 29, 2020', '2020-08-29T17:30:00-07:00', '04:30 pm - Thursday, August 29, 2020','Zoom', true, 'Emi Tsukuda', 'too many meetings', '2020-08-29T09:15:00-07:00', 'BCHFF2F62BWNJVZZ', null),
  (5, 'FDLGUGK6SOB54B3G', 'BCHFF2F62BWNJVPP', '2020-08-27T14:00:29-07:00', 'One-on-One', '30 Minute Meeting', 'consult with a lawyer', null, '2020-08-30T11:30:00-07:00', '11:30 am - Friday, August 30, 2020','2020-08-30T12:00:00-07:00', '12:00 pm - Friday, August 30, 2020','Zoom', true, 'Stephanie Simms', 'meetings hate em', '2020-08-28T09:15:00-07:00', 'BCHFF2F62BWNJVAA', null);`

// NOTE: currently not used in any test but it is for future use for frontend calendly feature
const SEED_USERS_CALENDLY_USERS_SQL = 
`INSERT INTO users_calendly_users (user_id, calendly_user_id) VALUES
  (1, 'ABCFF2F62BWNJVPP'),
  (2, 'BCHFF2F62BWNJVPP');`

  module.exports = {
    SEED_USER_SQL,
    SEED_SALARY_SQL,
    SEED_CHARGES_SQL,
    SEED_APPT_SQL,
    SEED_USERS_CALENDLY_USERS_SQL, 
    inputPassword,
    inputEmail,
    inputAdminPassword,
    inputAdminEmail
  };
  