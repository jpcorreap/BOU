const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
function MongoUtils() {
  const mu = {};

  const ObjectId = mongodb.ObjectID;
  const DB_NAME = process.env.DB_NAME || "Error Database";
  let url = process.env.DB_URL || "mongodb://localhost:27017";

  // To change url server
  mu.url = (paramUrl) => {
    url = process.env.DB_URL || "mongodb://localhost:27017";
    if (paramUrl !== "") url = paramUrl;
  };

  // Connect to the DB
  mu.connect = () => {
    console.log("Connecting to", DB_NAME);
    const options = { useUnifiedTopology: true, useNewUrlParser: true };
    const client = new MongoClient(url, options);
    return client.connect();
  };

  mu.users = {};

  mu.users.registerUser = (data) => {};

  mu.users.insert = (userData) => {
    return mu.connect().then((client) => {
      const usuarios = client.db(DB_NAME).collection("users");
      return usuarios.insertOne(userData).finally(() => client.close());
    });
  };

  mu.users.findByUsername = (username, cb) => {
    return mu.connect().then((client) => {
      const users = client.db(DB_NAME).collection("users");
      const query = { username };
      return users
        .findOne(query)
        .then((user, err) => {
          cb(err, user);
        })
        .finally(() => client.close());
    });
  };

  mu.users.findById = (_id, cb) => {
    return mu.connect().then((client) => {
      const users = client.db(DB_NAME).collection("users");
      const query = { _id: ObjectId(_id) };
      return users
        .findOne(query)
        .then((user, err) => {
          cb(err, user);
        })
        .finally(() => client.close());
    });
  };

  return mu;
}

module.exports = MongoUtils();