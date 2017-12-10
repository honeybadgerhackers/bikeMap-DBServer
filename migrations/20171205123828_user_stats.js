// * Add stats to user_account
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('route', (t) => {
      t.string('polyline_forward');
      t.string('route_preview');
      t.string('polyline_backward');
    }),
    knex.schema.table('user_account', (t) => {
      t.number('calories');
      t.number('avg_speed');
      t.number('avg_speed_counter');
      t.number('total_distance');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('route', (t) => {
      t.dropColumn('polyline_forward');
      t.dropColumn('route_preview');
      t.dropColumn('polyline_backward');
    }),
    knex.schema.table('user_account', (t) => {
      t.dropColumn('calories');
      t.dropColumn('avg_speed');
      t.dropColumn('avg_speed_counter');
      t.dropColumn('total_distance');
    }),
  ]);
};
