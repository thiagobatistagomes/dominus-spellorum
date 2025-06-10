const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.email = payload.email; // guarda o e-mail do usuário para uso posterior
    next(); // tudo certo, segue para a próxima função
  } catch (err) {
    return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

module.exports = verifyToken;
