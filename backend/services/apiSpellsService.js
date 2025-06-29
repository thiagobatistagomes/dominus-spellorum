const axios = require('axios');

async function buscarTodosFeiticos(){
  const resposta = await axios.get(process.env.HP_API_SPELLS_URL);
  return resposta.data;
}

module.exports = { buscarTodosFeiticos };
