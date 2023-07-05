exports.up = function(knex) {
  return knex.schema.createTable('tags', function(table) {
    table.increments('id').primary(); // ID autoincrementável e chave primária
    table.text('name').notNull(); 
    table.integer('user_id').references('id').inTable('users');
    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE")
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('tags');
};
