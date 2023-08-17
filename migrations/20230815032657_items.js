/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', (items)=>{
        items.increments('id').primary();
        items.string('name').notNullable();
        items.string('description').notNullable();
        items.decimal('weight').notNullable();
        items.decimal('height').notNullable();
        items.decimal('width').notNullable();
        items.decimal('length').notNullable();
        items.tinyint('fragile').notNullable();
        items.tinyint('recycle').notNullable();
        items.integer('category_id').unsigned();
        items.foreign('category_id').references("item_categories.id");
        items.timestamp('created_at').defaultTo(knex.fn.now())
        items.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items')
};
