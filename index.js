const express = require("express");
const db = require("./database");
const storage = require("./storage");
const app = express();

const products = db.collection('products');

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/img/:url", (req, res) => {
  if (!req.params.url) return res.sendStatus(500);

  res.sendFile(__dirname + `/public/images/${req.params.url}`);
});

app.get("/import", (req, res) => {
  res.sendFile(__dirname + "/import.html");
});

app.post("/uploadfile", storage.single("myFile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({
      Des: "Loi",
    });
  }

  res.json({
    url: file.filename,
  });
});

app.post("/insert", async (req, res) => {
  if (!req.body) return res.sendStatus(500);

  let itemData = {
    ...req.body,
    name: req.body.name.toLowerCase(),
  };
  
  const result = await products.insertOne(itemData)

  if(result.acknowledged) res.sendStatus(200);
  else res.sendStatus(500)
});

app.get("/q", async (req, res) => {
  const { name } = req.query;

  if (!name) res.sendStatus(500);

  try {
    const result = await products.find({name : {$regex : name, $options : 'i'}}).toArray();

    res.status(200).json(result);
    
  } catch (e) {
    res.status(500).json(e);
  }

});

app.listen((port = 3000), () => {
  console.log("Start on port", port);
});
