/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item_categories', (itemCategories)=>{
        itemCategories.increments('id').primary();
        itemCategories.string('name').notNullable();
        itemCategories.integer('parent_category').unsigned();
        itemCategories.foreign('parent_category').references("item_categories.id");
        itemCategories.timestamp('created_at').defaultTo(knex.fn.now())
        itemCategories.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('item_categories')
};
