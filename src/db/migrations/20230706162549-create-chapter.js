'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chapterSlug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      chapterNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      chapterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      chapterContent: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      storyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chapters')
  },
}
