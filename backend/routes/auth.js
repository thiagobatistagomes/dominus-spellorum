const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const usuariosPath = path.resolve(process.env.USUARIOS_JSON);
const JWT_SECRET = 'segredo-mistico';

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

router.post('/register', async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  // 1. Verificar campos vazios
  if (!nome || !email || !senha || !confirmarSenha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  // 2. Verificar e-mail válido
  if (!emailValido(email)) {
    return res.status(400).json({ mensagem: 'E-mail inválido.' });
  }

  // 3. Verificar comprimento da senha
  if (senha.length < 4) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 4 caracteres.' });
  }

  // 4. Verificar senha igual à confirmação
  if (senha !== confirmarSenha) {
    return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
  }

  const usuarios = await fs.readJSON(usuariosPath);

  // 5. Verificar e-mail único
  const jaExiste = usuarios.find(u => u.email === email);
  if (jaExiste) {
    return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
  }

  const novoUsuario = {
    nome,
    email,
    senha,
    feiticosDominados: [],
    feiticosAAprender: []
  };

  usuarios.push(novoUsuario);
  await fs.writeJSON(usuariosPath, usuarios, { spaces: 2 });

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
});


// LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha obrigatórios.' });
  }

  const usuarios = await fs.readJSON(usuariosPath);
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });

  res.status(200).json({
    mensagem: "Juro solenemente que não pretendo fazer nada de bom.",
    token,
    nome: usuario.nome
  });
});


// LOGOUT
router.post('/logout', (req, res) => {
  res.status(200).json({
    mensagem: "Malfeito feito. Sua sessão foi encerrada."
  });
});

module.exports = router;
