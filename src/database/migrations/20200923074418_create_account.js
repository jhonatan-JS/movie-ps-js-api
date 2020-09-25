exports.up = function(knex) {
  return knex.schema.createTable('account', function (table) {
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('email').unique().notNullable();
    table.string('senha').notNullable();
    table.string('dataDeNascimento').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('account');
};
