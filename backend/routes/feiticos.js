const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const axios = require('axios');
const { buscarTodosFeiticos } = require('../services/apiSpellsService');
const { acessarBancoUsuarios, buscarUsuarioPorEmail, attBdUsuarios } = require('../repositories/usuariosBD');


const usuariosPath = path.resolve(process.env.USUARIOS_JSON);


const statusPermitidos = ['Pendente', 'Em progresso'];
const prioridadesPermitidas = ['Alta', 'Média', 'Baixa'];

router.get('/', verifyToken, async (req, res) => {
  try {
    const usuario = await buscarUsuarioPorEmail(req.email);

    if(!usuario){
      return res.status(404).json({mensagem: 'Usuário não encontrado.'})
    }

    res.status(200).json({
      feiticosDominados: usuario.feiticosDominados || [],
      feiticosAAprender: usuario.feiticosAAprender || []
    });

  } catch (erro) {
    console.error('Erro ao buscar feitiços:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao buscar feitiços.' });
  }
});



router.post('/dominados', verifyToken, async (req, res) => {
  const { name, comentario='' } = req.body;

  if(!name){
    return res.status(400).json({ mensagem: 'O nome do feitiço é obrigatório!' });
  }

  try{
    const feiticosDisponiveis = await buscarTodosFeiticos();

    // verifica se o feitiço existe na lista oficial
    const feiticoValido = feiticosDisponiveis.find(f => f.name.toLowerCase() === name.toLowerCase());

    if(!feiticoValido){
      return res.status(400).json({ mensagem: 'Feitiço não reconhecido pela API' });
    }

    // busca usuário no JSON
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);


    if(!usuario){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    // verifica se o feitiço já está na lista
    const jaExiste = usuario.feiticosDominados.find(f => f.name.toLowerCase() === name.toLowerCase());
    if(jaExiste){
      return res.status(409).json({ mensagem: 'Feitiço já está na lista de dominados!' });
    }

  

    usuario.feiticosDominados.push({
      name: feiticoValido.name,
      description: feiticoValido.description,
      comentario
    });

    await attBdUsuarios(usuarios);

    res.status(201).json({ mensagem: 'Feitiço adicionado a lista de dominados com sucesso!' });

  }catch(erro){
    console.error('Erro ao validar ou salvar feitiço:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao processar o feitiço.' });
  }

});


router.post('/a-aprender', verifyToken, async (req, res) => {
  const { name, comentario = '', status = 'Pendente', prioridade = 'Média' } = req.body;

  if(!name){
    res.status(500).json({ mensagem: 'O nome do feitiço é obrigatório!' });
  }

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({ mensagem: `Status inválido! Valores permitidos: ${statusPermitidos.join(', ')}` });
  }

  if (!prioridadesPermitidas.includes(prioridade)) {
    return res.status(400).json({ mensagem: `Prioridade inválida! Valores permitidos: ${prioridadesPermitidas.join(', ')}` });
  }

  try{
    const feiticosDisponiveis = await buscarTodosFeiticos();

    // verifica se o feitiço existe na lista oficial
    const feiticoValido = feiticosDisponiveis.find(f => f.name.toLowerCase() === name.toLowerCase());

    if(!feiticoValido){
      return res.status(400).json({ mensagem: 'Feitiço não reconhecido pela API' });
    }

    // busca usuário no JSON
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);


    if(!usuario){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    // verifica se o feitiço já está na lista
    const jaExiste = usuario.feiticosAAprender.find(f => f.name.toLowerCase() === name.toLowerCase());
    if(jaExiste){
      return res.status(409).json({ mensagem: 'Feitiço já está na lista de feitiços a aprender!' });
    }

    // verifica se o feitiço já está na lista de feitiços dominados
    const estaEmDominados = usuario.feiticosDominados.find(f => f.name.toLowerCase() === name.toLowerCase());
    if(estaEmDominados){
      return res.status(409).json({ mensagem: 'O feitiço já foi dominado!' });
    }

    usuario.feiticosAAprender.push({
      name: feiticoValido.name,
      description: feiticoValido.description,
      comentario,
      status,
      prioridade
    });

    await attBdUsuarios(usuarios);

    res.status(201).json({ mensagem: 'Feitiço adicionado a lista de feitiços a aprender com sucesso!' });
  }catch(erro){
    console.error('Erro ao validar ou salvar feitiço:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao processar o feitiço.' })
  }

});


router.put('/dominados/:nome', verifyToken, async (req, res) => {
  const { nome } = req.params;
  const { comentario } = req.body;


  try {
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    const feitico = usuario.feiticosDominados.find(f => f.name.toLowerCase() === nome.toLowerCase());

    if (!feitico) {
      return res.status(404).json({ mensagem: 'Feitiço não encontrado na lista do usuário.' });
    }

    feitico.comentario = comentario;

    await attBdUsuarios(usuarios);

    return res.status(200).json({ mensagem: 'Comentário atualizado com sucesso.' });
  } catch (erro) {
      console.error('Erro ao atualizar comentário:', erro);
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar o feitiço.' });
  }

})

router.put('/a-aprender/:nome', verifyToken, async (req, res) => {
  const { nome } = req.params;
  const { comentario, status, prioridade } = req.body;

  

  try {
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    const feitico = usuario.feiticosAAprender.find(f => f.name.toLowerCase() === nome.toLowerCase());

    if (!feitico) {
      return res.status(404).json({ mensagem: 'Feitiço não encontrado na lista do usuário.' });
    }

    if (status !== undefined) {
      if (!statusPermitidos.includes(status)) {
        return res.status(400).json({ mensagem: `Status inválido! Valores permitidos: ${statusPermitidos.join(', ')}` });
      }
      feitico.status = status;
    }

    if (prioridade !== undefined) {
      if (!prioridadesPermitidas.includes(prioridade)) {
        return res.status(400).json({ mensagem: `Prioridade inválida! Valores permitidos: ${prioridadesPermitidas.join(', ')}` });
      }
      feitico.prioridade = prioridade;
    }

    feitico.comentario = comentario;
    await attBdUsuarios(usuarios);

    return res.status(200).json({ mensagem: 'Comentário atualizado com sucesso.' });

  } catch (erro) {
    console.error('Erro ao atualizar comentário:', erro);
    return res.status(500).json({ mensagem: 'Erro interno ao atualizar o feitiço.' });
  }
});


router.delete('/dominados/:nome', verifyToken, async (req, res) => {
  const { nome } = req.params;

  try {
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    const index = usuario.feiticosDominados.findIndex(f => f.name.toLowerCase() === nome.toLowerCase());

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Feitiço não encontrado na lista de dominados.' });
    }

    usuario.feiticosDominados.splice(index, 1);
    await attBdUsuarios(usuarios);

    return res.status(200).json({ mensagem: 'Feitiço removido com sucesso.' });

  } catch (erro) {
    console.error('Erro ao remover feitiço:', erro);
    return res.status(500).json({ mensagem: 'Erro interno ao remover feitiço.' });
  }
});


router.delete('/a-aprender/:nome', verifyToken, async (req, res) => {
  const { nome } = req.params;

  try {
    const usuarios = await acessarBancoUsuarios();
    const usuario = usuarios.find(u => u.email === req.email);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    const index = usuario.feiticosAAprender.findIndex(f => f.name.toLowerCase() === nome.toLowerCase());

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Feitiço não encontrado na lista de feitiços a aprender.' });
    }

    usuario.feiticosAAprender.splice(index, 1);
    await attBdUsuarios(usuarios);

    return res.status(200).json({ mensagem: 'Feitiço removido com sucesso.' });

  } catch (erro) {
    console.error('Erro ao remover feitiço:', erro);
    return res.status(500).json({ mensagem: 'Erro interno ao remover feitiço.' });
  }
});


module.exports = router;
