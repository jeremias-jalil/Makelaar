const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("Contract", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "activo",
        "modificado",
        "eliminado",
        "pendiente",
        "vencido",
        "rechazado"
      ),
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
