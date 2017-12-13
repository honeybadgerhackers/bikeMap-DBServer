// * Add stats to user_account
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('route', (t) => {
      t.string('photo_url');
      t.string('route_preview');
    }),
    knex.schema.table('route', (t) => {
      t.string('photo_url');
    }),
    knex.schema.table('user_account', (t) => {
      t.integer('calories');
      t.integer('avg_speed');
      t.integer('avg_speed_counter');
      t.integer('total_distance');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('route', (t) => {
      t.dropColumn('photo_url');
      t.dropColumn('route_preview');
    }),
    knex.schema.table('route', (t) => {
      t.dropColumn('photo_url');
    }),
    knex.schema.table('user_account', (t) => {
      t.dropColumn('calories');
      t.dropColumn('avg_speed');
      t.dropColumn('avg_speed_counter');
      t.dropColumn('total_distance');
    }),
  ]);
};
