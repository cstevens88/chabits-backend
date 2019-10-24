'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chain = sequelize.define('Chain', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  Chain.associate = function(models) {
    // associations can be defined here
  };
  return Chain;
};