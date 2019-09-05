
const USER_DATA = [
  {email: 'testuser@gmail.com', password: 'password123', first_name: 'Test', last_name: 'User'},
  {email: 'admin@gmail.com', password: 'admin123', first_name: 'Admin', last_name: 'User'},
  {email: 'nate@gmail.com', password: 'nate123', first_name: 'Nate', last_name: 'Lipp'},
  { email: 'elie@gmail.com', password: 'elie123', first_name: 'Elie', last_name: 'Schoppik'},
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
  { user_email: 'testuser@gmail.com', event_id: 'BCHFF2F62BWNJVPP', calendly_user_id: 'ABCFF2F62BWNJVPP', created_at: '2020-08-29T09:15:00-07:00', event_type: 'One-on-One', event_type_name: '30 Minute Meeting', reason: 'legal advice', admin_notes: null, start_time: '2020-08-31T09:15:00-07:00', start_time_pretty: '09:15 am - Saturday, August 31, 2020', end_time: '2020-08-31T09:45:00-07:00', end_time_pretty: '09:45 am - Saturday, August 31, 2020', location: 'Zoom', canceled: false, canceler_name: null, cancel_reason: null, canceled_at: null, old_event_id: null, new_event_id: null},
  {user_email: 'testuser@gmail.com', event_id: 'GCIEBYAHGKWNENHS', calendly_user_id: 'BCHFF2F62BWNJVPP', created_at: '2020-08-27T14:00:29-07:00', event_type: 'One-on-One', event_type_name: '15 Minute Meeting', reason: 'consult with a lawyer', admin_notes: null, start_time: '2020-08-30T14:00:29-07:00',start_time_pretty: '02:00 pm - Friday, August 30, 2020', end_time: '2020-08-30T14:15:29-07:00', end_time_pretty: '02:15 pm - Friday, August 30, 2020', location: 'Zoom', canceled: false, canceler_name: null, cancel_reason: null, canceled_at: null, old_event_id: null, new_event_id: null},
  {user_email: 'admin@gmail.com', event_id: 'AAFOAUQKKVOBSZVD', calendly_user_id: 'BCHFF2F62BWNJVPP', created_at: '2020-08-27T16:30:00-07:00', event_type: 'One-on-One', event_type_name: '30 Minute Meeting', reason: 'negotiate my salary', admin_notes: null, start_time: '2020-09-02T16:30:00-07:00', start_time_pretty: '04:30 pm - Moday, September 2, 2020', end_time:'2020-09-02T17:00:00-07:00',  end_time_pretty: '05:00 pm - Moday, September 2, 2020', location: 'Zoom', canceled: false, canceler_name: null, cancel_reason: null, canceled_at: null, old_event_id:null, new_event_id: null},
  {user_email: 'nate@gmail.com', event_id: 'EGMBBYHHDUZTVUKA', calendly_user_id: 'BCHFF2F62BWNJVPP', created_at: '2020-08-27T12:01:01-07:00', event_type: 'One-on-One', event_type_name: '60 Minute Meeting', reason: 'legal advice', admin_notes: null, start_time: '2020-08-29T16:30:00-07:00', start_time_pretty: '04:30 pm - Thursday, August 29, 2020', end_time:'2020-08-29T17:30:00-07:00', end_time_pretty:  '04:30 pm - Thursday, August 29, 2020', location: 'Zoom', canceled: true, canceler_name: 'Test Cancel', cancel_reason: 'too many meetings', canceled_at: '2020-08-29T09:15:00-07:00', old_event_id: 'BCHFF2F62BWNJVZZ', new_event_id: null},
  {user_email: 'joel@gmail.com', event_id: 'FDLGUGK6SOB54B3G', calendly_user_id: 'BCHFF2F62BWNJVPP', created_at: '2020-08-27T14:00:29-07:00', event_type: 'One-on-One', event_type_name: '30 Minute Meeting', reason: 'consult with a lawyer', admin_notes: null, start_time: '2020-08-30T11:30:00-07:00', start_time_pretty: '11:30 am - Friday, August 30, 2020', end_time: '2020-08-30T12:00:00-07:00', end_time_pretty: '12:00 pm - Friday, August 30, 2020',location: 'Zoom', canceled: true, canceler_name: 'Test Cancel2', cancel_reason: 'meetings hate em', canceled_at: '2020-08-28T09:15:00-07:00', old_event_id: 'BCHFF2F62BWNJVAA', new_event_id: null}
]


// NOTE: currently not used in any test but it is for future use for frontend calendly feature
const USERS_CALENDLY_USERS_DATA = [
{user_id: 1, calendly_user_id: 'ABCFF2F62BWNJVPP'},
{user_id: 2, calendly_user_id: 'BCHFF2F62BWNJVPP'}
]
  
const ALL_DATA = [USER_DATA, SALARY_DATA, CHARGE_DATA, APPOINTMENTS_DATA, USERS_CALENDLY_USERS_DATA]

  module.exports = ALL_DATA
  