
exports.up = function(knex, Promise) {
    return knex.schema.createTable('address', function (table) {
        table.increments();
        table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("address")
};
