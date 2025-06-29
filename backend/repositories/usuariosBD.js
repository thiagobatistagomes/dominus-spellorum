const fs = require('fs-extra');
const path = require('path');

const bdUsuariosPath = path.resolve(process.env.USUARIOS_JSON);

async function acessarBancoUsuarios(){
  return await fs.readJSON(bdUsuariosPath);
}

async function buscarUsuarioPorEmail(email){
  const bdUsuarios = await acessarBancoUsuarios();
  return bdUsuarios.find(u => u.email === email);
}

async function attBdUsuarios(bdUsuarios) {
  await fs.writeJSON(bdUsuariosPath, bdUsuarios, { spaces: 2 });
}

module.exports = { acessarBancoUsuarios, buscarUsuarioPorEmail, attBdUsuarios };
