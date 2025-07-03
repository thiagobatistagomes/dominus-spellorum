const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { buscarUsuarioPorEmail, attBdUsuarios, acessarBancoUsuarios } = require('../repositories/usuariosBD');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

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


  // 5. Verificar e-mail único
  const jaExiste = await buscarUsuarioPorEmail(email);
  if (jaExiste) {
    return res.status(400).json({ mensagem: 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.' });
  }
  
  // hash da senha para criptografar
  const hashSenha = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: uuidv4(),
    nome,
    email,
    senha: hashSenha,
    feiticosDominados: [],
    feiticosAAprender: []
  };

  const bdUsuarios = await acessarBancoUsuarios();
  bdUsuarios.push(novoUsuario);
  await attBdUsuarios(bdUsuarios);

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
});


// LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha obrigatórios.' });
  }

  try{
    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      mensagem: 'Juro solenemente que não pretendo fazer nada de bom.',
      token,
      nome: usuario.nome
    });

  }catch(erro){
    console.error('Erro no login:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao tentar realizar login.' });
  }

});



module.exports = router;
