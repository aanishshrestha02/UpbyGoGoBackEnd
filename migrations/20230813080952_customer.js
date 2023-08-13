/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', (customers)=>{
        customers.increments('id').primary();
        customers.string('name').notNullable();
        customers.string('phonenumber').notNullable();
        customers.string('address').notNullable();
        customers.string('email').unique().notNullable();
        customers.string('password').notNullable();
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('customers')
};
