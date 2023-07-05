
exports.up = function(knex) {
  return knex.schema.createTable('notes', function(table) {
    table.increments('id').primary(); // ID autoincrementável e chave primária
    table.text('title');
    table.text('description');
    table.integer('rating')
    table.integer('user_id').references('id').inTable('users')
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
