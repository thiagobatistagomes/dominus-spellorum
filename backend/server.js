require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const feiticosRoutes = require('./routes/feiticos');



const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/feiticos', feiticosRoutes);

// Rota base
app.get('/', (req, res) => {
  res.send('Dominus Spellorum Backend rodando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
