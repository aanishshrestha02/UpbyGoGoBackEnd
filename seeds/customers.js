/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()
  await knex('customers').insert([
    {name: 'Raj Shrestha', phonenumber: '9841212156', address:'Kathmandu', email:'rajshrestha416@gmail.com', password:"hashTestTest"},
  ]);
};
