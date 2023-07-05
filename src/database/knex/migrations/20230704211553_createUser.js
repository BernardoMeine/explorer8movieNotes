exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary(); // ID autoincrementável e chave primária
    table.text('name');
    table.text('email');
    table.text('password');
    table.text('avatar').defaultTo(null);
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
