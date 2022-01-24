
exports.up = function(knex, Promise) {
    return knex.schema.createTable('product', function (table) {
        table.increments();
        table.text('description');
    })
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("product");
};
