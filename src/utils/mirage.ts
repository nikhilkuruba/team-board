import { createServer, Model } from 'miragejs';

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      // Create mock employee data
      server.create('employee', { id: '1', name: 'Mark Hill', designation: 'CEO', team: 'Leadership', manager: null });

      server.create('employee', { id: '2', name: 'Bob', designation: 'CTO', team: 'Engineering', manager: '1' });
      server.create('employee', { id: '3', name: 'Eva', designation: 'Technical Support Manager', team: 'Tech Support', manager: '1' });
      server.create('employee', { id: '4', name: 'Grace', designation: 'Marketing Manager', team: 'Marketing', manager: '1' });
      server.create('employee', { id: '5', name: 'Linda May', designation: 'Sales Manager', team: 'Sales', manager: '1' });
      server.create('employee', { id: '6', name: 'John Green', designation: 'Chief accounting officer', team: 'Accounting', manager: '1' });

      server.create('employee', { id: '7', name: 'Charlie', designation: 'Software development manager', team: 'Engineering', manager: '2' });

      server.create('employee', { id: '8', name: 'David', designation: 'Lead developer', team: 'Engineering', manager: '5' });
      server.create('employee', { id: '9', name: 'Hannah', designation: 'Lead developer', team: 'Engineering', manager: '5' });

      server.create('employee', { id: '10', name: 'Frank', designation: 'Software Developer', team: 'Engineering', manager: '7' });
      server.create('employee', { id: '11', name: 'Hannah2', designation: 'Software Developer', team: 'Engineering', manager: '8' });

      server.create('employee', { id: '12', name: 'Hannah3', designation: 'Customer Service Representative', team: 'Tech Support', manager: '3' });
      server.create('employee', { id: '13', name: 'Hannah4', designation: 'Marketing analyst', team: 'Marketing', manager: '4' });
      server.create('employee', { id: '14', name: 'Hannah5', designation: 'Marketing analyst', team: 'Marketing', manager: '4' });
      server.create('employee', { id: '15', name: 'Hannah6', designation: 'Sales Representative', team: 'Sales', manager: '5' });
      server.create('employee', { id: '16', name: 'Hannah7', designation: 'Sales Representative', team: 'Sales', manager: '5' });
      server.create('employee', { id: '17', name: 'Hannah8', designation: 'Accountant', team: 'Accounting', manager: '6' });
      server.create('employee', { id: '18', name: 'Hannah9', designation: 'Accountant', team: 'Accounting', manager: '6' });
    },

    routes() {
      this.namespace = 'api'; // Defines the API namespace

      // Route to fetch all employees
      this.get('/employees', (schema) => {
        return schema.all('employee');
      });
    },
  });
}