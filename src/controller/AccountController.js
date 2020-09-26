const connection = require('../database/connection');
const crypto = require('crypto');

const CryptoJS = require("crypto-js");

module.exports = {

  async index(request, response) {
    const accouts = await connection('account').select('*');

    return response.json(accouts);
  },

  async create(request, response) {
    const {nome, email, senha, dataDeNascimento} = request.body;

    var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);

    const id = crypto.randomBytes(4).toString('hex');
    try {
      await connection('account').insert({
        id,
        nome,
        email,
        senha: hash,
        dataDeNascimento
      });


    } catch (error) {
      error.errno == 19 ? "Email já cadastrado" : "Não foi possivel cadastrar sua conta";
    }
    return response.json(`Olá ${nome}`);
  }
}
