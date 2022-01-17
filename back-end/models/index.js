'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/sequelize.json')[env];
const db = {};
const User = require('./User');
const Birthday = require('./Birthday');
const Schedule = require('./Schedule');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Birthday = Birthday;
db.Schedule = Schedule;

User.init(sequelize);
Birthday.init(sequelize);
Schedule.init(sequelize);

module.exports = db;
