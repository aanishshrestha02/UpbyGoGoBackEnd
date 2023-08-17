/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
    return knex.schema.table('customers', (customers) => {
        customers.timestamp('created_at').defaultTo(knex.fn.now());
        customers.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('customers', customer => {
        customer.dropColumn('created_at');
        customer.dropColumn('updated_at');
    });
};
