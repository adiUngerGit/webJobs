const express = require("express");
const mongo = require("./init-mongo");
const http = require("http");
const app = express();
const server = http.createServer(app);
const ObjectId = require("mongodb").ObjectId;

const io = require("socket.io")(server);

//socketid
io.on("connection", (socket) => {
  console.log("user connected! socket id:", socket.id);
});

app.use(express.static(__dirname + "/client"));

app.use(express.json());

// app.get("/main", function (request, response) {
//   response.sendFile(__dirname + "/client/main.html");
// });

app.post("/addAd", async (request, response) => {
  ///TODO
  const ad = request.body;
  await mongo.db("web-ads").collection("ads").insertOne(ad);
  response.send("ok");
  io.emit("ad-added", addTemplateUrl(ad));
});

// app.patch('/updateAd', async (req, res) => {
//   mongo.db('adsfasdf').collection('asdf').updateOne()
// })

app.post("/deleteAd", async (request, response) => {
  try {
    await mongo
      .db("web-ads")
      .collection("ads")
      .deleteOne({ name: request.body.to_delete });
    response.send("ok");
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

function removeField(obj, field) {
  const clone = { ...obj };
  delete clone[field];
  return clone;
}

app.patch("/updateAd", async function (req, res) {
  try {
    const data = addTemplateUrl(req.body);

    await mongo
      .db("web-ads")
      .collection("ads")
      .replaceOne(
        { _id: new ObjectId(req.body._id) },
        removeField(data, "_id")
      );

    console.log("updated to", req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get("/getAd", async (req, res) => {
  const name = req.query.name;
  try {
    res.send(await mongo.db("web-ads").collection("ads").findOne({ name }));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

function addTemplateUrl(ad) {
  return {
    ...ad,
    templateUrl: `/Templates/${ad.templateName}.html`,
  };
}

app.patch("/insertUser", async (request, response) => {
  const user = request.body;
  await mongo.db("web-ads").collection("users").insertOne(user);
  response.send("OK");
  // io.emit("user-add",);
});

app.patch("/signInUser", async (request, response) => {
  const user = request.body;
  response.send(
    await mongo
      .db("web-ads")
      .collection("users")
      .find({ name: user.name, password: user.password })
      .toArray()
  );
  // response.send("OK");
  // io.emit("user-add",);
});

app.post("/saveUserData", async (request, response) => {});

app.post("/getAdSuprise", async (request, response) => {
  try {
    console.log(request.body.salary);
    const ads = await mongo
      .db("web-ads")
      .collection("ads")
      .find({
        experiense: request.body.experiense,
        locationName: { $regex: new RegExp(request.body.locationName, "i") },
      })
      .toArray();

    response.send(ads);
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

app.post("/getAdSerchJob", async (request, response) => {
  try {
    const sal = parseInt(request.body.salary);
    console.log(request.body.salary);
    const ads = await mongo
      .db("web-ads")
      .collection("ads")
      .find({
        // salary: { $gt: sal },
        experiense: request.body.experiense,

        locationName: { $regex: new RegExp(request.body.locationName, "i") },
      })
      .toArray();

    const mappedAds = ads.map(addTemplateUrl);

    response.send(mappedAds);
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

app.post("/getAdSerchCompany", async (request, response) => {
  try {
    const sal = parseInt(request.body.salary);
    console.log(request.body.salary);
    const ads = await mongo
      .db("web-ads")
      .collection("ads")
      .find({
        name: request.body.name,
        employees: request.body.employees,
        years: request.body.years,
      })
      .toArray();

    const mappedAds = ads.map(addTemplateUrl);

    response.send(mappedAds);
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

app.get("/apiscreen", async function (request, response) {
  try {
    const ads = await mongo.db("web-ads").collection("ads").find({}).toArray();

    const mappedAds = ads.map(addTemplateUrl);

    response.send(mappedAds);
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

app.get("/adds_name", async function (request, response) {
  try {
    const names = await mongo
      .db("web-ads")
      .collection("ads")
      .find({})
      .toArray();
    response.send(names.map((obj) => obj.name));
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

// app.get("/add-beer", async (req, res) => {
//   await mongo.db("web-ads").collection("beers").insertOne({
//     name: req.query.name,
//     date: Date.now(),
//   });
//   res.send("okay");
// });

// app.get("/get-beers", async (req, res) => {
//   const results = await mongo
//     .db("web-ads")
//     .collection("beers")
//     .find({})
//     .toArray();
//   res.send(results);
// });

mongo.connect((err) => {
  if (err) throw err;
  server.listen(9001);
});
