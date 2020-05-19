
exports.seed = function (knex) {
  // Deletes ALL existing entries


  // Inserts seed entries
  return knex('users').insert([
    { 
      department: "accounting",
      username: "admin1",
      password:"admin1"
    },
  ]);

};
