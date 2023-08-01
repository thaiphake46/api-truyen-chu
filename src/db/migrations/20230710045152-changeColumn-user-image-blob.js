'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'Stories',
          'storyImage',
          {
            // type: Sequelize.DataTypes.BLOB('long'),
            type: Sequelize.DataTypes.TEXT,
          },
          { transaction: t }
        ),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'Stories',
          'storyImage',
          {
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
      ])
    })
  },
}
