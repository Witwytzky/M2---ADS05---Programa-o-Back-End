const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let clientes = [];

// Rota para listar todos os clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Rota para cadastrar um novo cliente
app.post('/clientes', (req, res) => {
  const novoCliente = {
    _id: uuidv4(),  // Gera um novo ID único
    ...req.body
  };
  clientes.push(novoCliente);
  res.sendStatus(200);
});

// Rota para atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const novosDados = req.body;

  // Lógica para encontrar e atualizar o cliente
  const clienteIndex = clientes.findIndex(cliente => cliente._id === clienteId);
  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { _id: clienteId, ...novosDados };
    res.json(clientes[clienteIndex]);
  } else {
    res.status(404).send('Cliente não encontrado.');
  }
});

// Rota para remover um cliente
app.delete('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;

  // Lógica para encontrar e remover o cliente
  clientes = clientes.filter(cliente => cliente._id !== clienteId);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
