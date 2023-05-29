const express = require('express');
const app = express();
const port = 3000;

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Enable parsing of request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Medicine data
let medicines = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { medicines });
});

app.post('/medicines', (req, res) => {
  const { name, quantity, price, description } = req.body;
  medicines.push({ name, quantity, price, description });
  res.redirect('/');
});

app.get('/medicines/:id', (req, res) => {
  const id = req.params.id;
  const medicine = medicines[id];
  res.render('medicine', { medicine, medicineIndex: id });
});

app.post('/medicines/:id', (req, res) => {
  const id = req.params.id;
  const { name, quantity, price, description } = req.body;
  medicines[id] = { name, quantity, price, description };
  res.redirect('/');
});

app.post('/medicines/:id/delete', (req, res) => {
  const id = req.params.id;
  medicines.splice(id, 1);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Medicine registry app listening at http://localhost:${port}`);
});
