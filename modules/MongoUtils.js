const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
function MongoUtils() {
  const mu = {};
  
  const ObjectId = mongodb.ObjectID;
  const DB_NAME = process.env.DB_NAME || "Error Database";
  let url = process.env.DB_URL || "mongodb://localhost:27017";

  // To change url server
  mu.url = paramUrl => {
    url = process.env.DB_URL || "mongodb://localhost:27017";
    if (paramUrl !== "") url = paramUrl;
  };

  // To search _id
  mu.ObjectId = ObjectId;

  // Connect to the DB
  mu.connect = () => {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };
    const client = new MongoClient(url, options);
    return client.connect();
  };

  mu.passport = {};

  mu.passport.registerUser = (data) => {

  }

  mu.passport.insert = (userData) => {
    return mu.connect()
      .then(client => {
        console.log("Connecting to", DB_NAME);
        console.log("Collection users");
        const usuarios = client.db(DB_NAME).collection("users");
        return usuarios.insertOne(userData).finally(() => client.close());
      });
  };


  return mu;
}

module.exports = MongoUtils();
