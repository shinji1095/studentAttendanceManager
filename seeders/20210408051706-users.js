'use strict';
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const now = moment().format();

     await queryInterface.bulkInsert('Users', [{
         name: '江藤真士',
         hashID: "222",
         academic: "M1",
         studentID: 21966008,
         createdAt: now,
         updatedAt: now

       }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
