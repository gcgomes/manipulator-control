exports.up = function(knex) {
  return knex.schema.createTable('positions', table => {
    table.increments('id').primary().unsigned().notNullable();
    table.integer('shoulder').notNullable();
    table.integer('elbow').notNullable();
    table.integer('pulse').notNullable();
  });
}

exports.down = function(knex) {
  return knex.schema.dropTable('positions');
}