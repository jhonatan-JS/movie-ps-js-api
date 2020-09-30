const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { email } = request.body;

    const account = await connection('account')
    .where('email', email)
    .select('nome')
    .first();

    if (!account) {
      return response.status(400).json({ error: 'Nenhuma conta encontrada com este Email' });
    }

    return response.json(account);
  }
}
