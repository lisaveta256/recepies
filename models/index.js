const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cleaning = require("./cleaning.model.js")(sequelize, Sequelize);
db.gas = require("./gas.model.js")(sequelize, Sequelize);
db.layer = require("./layer.model.js")(sequelize, Sequelize);
db.process = require("./process.model.js")(sequelize, Sequelize);

module.exports = db;
