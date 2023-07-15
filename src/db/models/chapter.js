'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chapter.init(
    {
      chapterSlug: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      chapterNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      chapterName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      chapterContent: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      storyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Chapter',
    }
  )
  return Chapter
}
