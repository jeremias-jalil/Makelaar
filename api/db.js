require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_HOST_PORT,
  DB_DATABASE,
  DB_DIALECT,
} = process.env;

const db = new Sequelize(
  DATABASE_URL ||
    `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
  }
);

db.authenticate();

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(db));

let entries = Object.entries(db.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
db.models = Object.fromEntries(capsEntries);

const { User, Property, Image, Contract, File, Payment } = db.models;

Property.hasMany(Contract);
Contract.belongsTo(Property, { foreignKey: "PropertyId" });

User.hasMany(Contract);
Contract.belongsTo(User, { foreignKey: "UserId" });

Property.hasMany(Image);
Image.belongsTo(Property, { foreignKey: "ImageId" });

Contract.hasMany(File);
File.belongsTo(Contract);

User.hasMany(Payment);
Payment.belongsTo(User);

Contract.hasMany(Payment);
Payment.belongsTo(Contract, { foreignKey: "ContractId" });

module.exports = {
  db,
  ...db.models,
  conn: db,
};
