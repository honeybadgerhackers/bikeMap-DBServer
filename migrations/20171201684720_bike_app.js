/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_account', (t) => {
      t.string('social_media_id').unique();;
      t.string('social_media_token');
    }),
  ]);
}
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_account', (t) => {
      t.dropColumn('social_media_id');
      t.dropColumn('social_media_token');
    }),
  ]);
};
