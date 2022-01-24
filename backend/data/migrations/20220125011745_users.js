exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.text('cellno');
      table.string("password_digest");
      table.integer('role_id').unsigned().references('id').inTable('role').onDelete('cascade');
    })
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};