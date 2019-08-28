export const users = [{
    id: 1,
    email: 'testuser@gmail.com',
    password: 'password123',
    is_admin: false,
    first_name: 'Test',
    last_name: 'User',
    current_company: 'Google',
    salary: 1,
    hire_date: '2019-06-14',
    needs: 'Talk to financial advisor about salary/equity negotiations.',
    goals: 'Increase in equity.'
  },
  {
    id: 2,
    email: 'admin@gmail.com',
    password: 'admin123',
    is_admin: true,
    first_name: 'Admin',
    last_name: 'User',
    current_company: '',
    salary: 2,
    hire_date: '2019-09-14',
    needs: '',
    goals: ''
  },
  {
    id: 3,
    email: 'nate@gmail.com',
    password: 'nate123',
    is_admin: false,
    first_name: 'Nate',
    last_name: 'Lipp',
    current_company: 'Rithm',
    salary: 3,
    hire_date: '2019-10-10',
    needs: 'Get help from a lawyer.',
    goals: 'Increase in salary.'
  },
  {
    id: 4,
    email: 'elie@gmail.com',
    password: 'elie123',
    is_admin: false,
    first_name: 'Elie',
    last_name: 'Schoppik',
    current_company: 'Rithm',
    salary: 4,
    hire_date: '2019-10-01',
    needs: 'Talk to financial advisor to calculate how many instructors he can hire.',
    goals: 'Recruit more instructors.'
  },
  {
    id: 5,
    email: 'joel@gmail.com',
    password: 'joel123',
    is_admin: false,
    first_name: 'Joel',
    last_name: 'Burton',
    current_company: 'Rithm',
    salary: 5,
    hire_date: '2018-09-14',
    needs: 'General investment advice',
    goals: 'Help bootcamp grads negotiate.'
  }
]

export const charges = [{
    id: 32,
    user_id: 1,
    amount: 500,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-09-15',
    payment_date: null,
    paid: false
  },
  {
    id: 33,
    user_id: 2,
    amount: 1000.99,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-07-01',
    payment_date: '2019-06-14',
    paid: true
  },
  {
    id: 34,
    user_id: 3,
    amount: 500,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-09-15',
    payment_date: null,
    paid: false
  },
  {
    id: 35,
    user_id: 4,
    amount: 750,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-09-15',
    payment_date: null,
    paid: false
  },
  {
    id: 36,
    user_id: 5,
    amount: 1000,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-09-15',
    payment_date: null,
    paid: false
  },
  {
    id: 999999,
    user_id: 1,
    amount: 500,
    description: 'Percentage of negotiation salary.',
    due_date: '2019-09-15',
    payment_date: null,
    paid: false
  }
]

export const salaries = [{
    id: 1,
    salary: 150000,
    bonus: 25000,
    equity: 0.001
  },
  {
    id: 2,
    salary: 100000,
    bonus: 5000,
    equity: 0.005
  },
  {
    id: 3,
    salary: 90000,
    bonus: 2000,
    equity: 0.0035
  },
  {
    id: 4,
    salary: 200000,
    bonus: 5000,
    equity: 0.33
  },
  {
    id: 5,
    salary: 200000,
    bonus: 5000,
    equity: 0.1
  }
]