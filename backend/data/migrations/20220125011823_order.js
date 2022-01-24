
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', function (table) {
        table.increments();
        table.date('delivery_date');
        table.string('order_status').default('pending');
        table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("order")
};
