const mongo = require("mongodb");

const username = "admin";
const paswword = "tq3vAaYZRVE1oria";

const uri =
  `mongodb+srv://` +
  `${username}:${paswword}` +
  `@cluster0.wlgwwqw.mongodb.net/?retryWrites=true&w=majority`;

const client = new mongo.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: mongo.ServerApiVersion.v1,
});

module.exports = client;
