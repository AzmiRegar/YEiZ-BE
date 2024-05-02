'use strict';
let md5 = require('md5');
const { now } = require('sequelize/types/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstname: "yusuf",
        lastname: "kalla",
        email: "yusuf@gmail.com",
        password: md5 ("12345"),
        number: "085256357285",
        address: "jl danau ranau",
        role: "user",
        createdAt : now,
        updatedAt: now
      },
      {
        firstname: "kukuh",
        lastname: "haryanto",
        email: "kukuh@gmail.com",
        password: md5 ("12345"),
        number: "082589254990",
        address: "jl danau toba",
        role: "user",
        createdAt : now,
        updatedAt: now
      },
      {
        firstname: "frenki",
        lastname: "de jong",
        email: "frenki@gmail.com",
        password: md5 ("12345"),
        number: "085628555888",
        address: "jl ir mujiono",
        role: "user",
        createdAt : now,
        updatedAt: now
      }
    ]) 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
