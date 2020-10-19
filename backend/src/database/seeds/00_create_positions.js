exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('positions').del()
    .then(function () {
      // Inserts seed entries
      return knex('positions').insert([
        {
          id: 1,
          shoulder: 0,
          elbow: 0,
          pulse: 0,
        },
        {
          id: 2,
          shoulder: 180,
          elbow: 180,
          pulse: 180,
        },
      ]);
    });
};