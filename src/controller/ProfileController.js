const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
   const account_id = request.headers.authorization;

   const profiles = await connection('profiles')
   .where('account_id', account_id)
   .select('*');

   return response.json(profiles);
  },

  async create(request, response) {
    const { nome } = request.body;
    const account_id = request.headers.authorization;

    try {
      await connection('profiles').insert({nome, account_id});

    } catch (error) {
      "Erro ao criar perfil"
    }

    return response.json(`Olá ${nome}`);
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection('profiles').where('id', id).delete();

    return response.status(204).send();
  }
}
