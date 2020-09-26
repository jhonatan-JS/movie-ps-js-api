const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const account_id = request.headers.authorization;

    const profiles = await connection("profiles")
      .where("account_id", account_id)
      .select("*");

    return response.json(profiles);
  },

  async create(request, response) {
    const { nome } = request.body;
    const account_id = request.headers.authorization;
    let mensagemRetorno = "";

    if (nome.match(/[\s]/)) {
      mensagemRetorno = "Nome não deve ser composto!";
    } else {
      try {
        const profiles = await connection("profiles")
          .where("account_id", account_id)
          .select("*");
        console.log(profiles);
        console.log(profiles.length);

        if (profiles.length < 4) {
          await connection("profiles").insert({ nome, account_id });
          mensagemRetorno = "Perfil Criado com sucesso!";
        } else {
          mensagemRetorno = "Pode conter apenas 4 perfis";
        }
      } catch (error) {
        console.log(error);
        mensagemRetorno = "Erro ao criar perfil";
      }
    }

    return response.json(mensagemRetorno);
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection("profiles").where("id", id).delete();

    return response.status(204).send();
  },
};
 