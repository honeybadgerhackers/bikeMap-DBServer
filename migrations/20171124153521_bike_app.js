/* eslint-disable */
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_account', (t) => {
      t.increments('id').primary();
      t.string('first_name');
      t.string('last_name');
      t.string('picture');
      t.string('email');
      t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('route', (t) => {
      t.increments('id').primary(); 
      t.string('route_name');
      t.string('type');
      t.integer('id_user_account')
        .references('id')
        .inTable('user_account');
      t.decimal('current_rating');
      t.integer('favorite_count');
      t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('waypoint', (t) => {
      t.increments('id').primary();            
      t.integer('id_route')
        .references('id')
        .inTable('route');
      t.decimal('lat', 8, 6);
      t.decimal('lng', 9, 6);
      t.string('street');
      t.integer('count');
      t.string('address');
    }),
    knex.schema.createTable('session', (t) => {
      t.increments('id').primary();            
      t.integer('id_user_account')
        .references('id')
        .inTable('user_account');
      t.integer('id_route')
        .references('id')
        .inTable('route');
      t.decimal('mph');
      t.integer('time');
      t.decimal('distance');
      t.integer('calories');
    }),
    knex.schema.createTable('rating', (t) => {
      t.increments('id').primary();            
      t.integer('id_user_account')
        .references('id')
        .inTable('user_account');
      t.integer('id_route')
        .references('id')
        .inTable('route');
      t.integer('rating');
    }),
    knex.schema.createTable('favorite', (t) => {
      t.increments('id').primary();            
      t.integer('id_user_account')
        .references('id')
        .inTable('user_account');
      t.integer('id_route')
        .references('id')
        .inTable('route');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_account'),
    knex.schema.dropTable('route'),
    knex.schema.dropTable('waypoint'),
    knex.schema.dropTable('session'),
    knex.schema.dropTable('rating'),
    knex.schema.dropTable('favorite'),
  ]);
};
