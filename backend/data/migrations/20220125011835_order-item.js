
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order-item', function (table) {
        table.increments();
        table.integer('prod_id').unsigned().references('id').inTable('product').onDelete('cascade');
        table.integer('order_id').unsigned().references('id').inTable('order').onDelete('cascade');
    })
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("order-item");
};
