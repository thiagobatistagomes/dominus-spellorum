const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de feitiços funcionando!');
});

module.exports = router;
