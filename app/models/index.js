const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.archives = require("./archive.model.js")(mongoose);

db.roles = require("./role.model.js")(mongoose);
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
