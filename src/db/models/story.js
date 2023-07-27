'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const TABLE_NAME = 'Story'
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'getStoryAuthor',
      })
      Story.hasMany(models.Chapter)
    }
  }
  Story.init(
    {
      storySlug: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      storyImage: {
        allowNull: false,
        type: DataTypes.BLOB('long'),
      },
      storyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: TABLE_NAME,
    }
  )
  return Story
}
