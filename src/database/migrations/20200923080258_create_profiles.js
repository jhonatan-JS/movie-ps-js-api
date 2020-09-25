
exports.up = function(knex) {
  return knex.schema.createTable('profiles', function (table) {
    table.increments();
    table.string('nome').notNullable();
    table.string('account_id').notNullable();
    table.foreign('account_id').references('id').inTable('account');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};
