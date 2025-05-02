const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Customer = require('./models/customer');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// GET all customers
app.get('/api/customers', async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

//  GET single customer by ID
app.get('/api/customers/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (customer) res.json(customer);
  else res.status(404).json({ error: 'Customer not found' });
});

//  POST new customer
app.post('/api/customers', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  const customer = await Customer.create({ name, email });
  res.status(201).json(customer);
});

// PUT update customer
app.put('/api/customers/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  const { name, email } = req.body;
  await customer.update({ name, email });
  res.json(customer);
});

// DELETE customer
app.delete('/api/customers/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  await customer.destroy();
  res.status(204).send();
});

const seed = async () => {
  const count = await Customer.count();
  if (count === 0) {
    await Customer.bulkCreate([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);
  }
};


(async () => {
  await sequelize.sync({ alter: true });
  await seed();
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
})();
