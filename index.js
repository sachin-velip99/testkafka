"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

module.exports = {
  app: app,
};

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "SAAMS CONTROLLER" });
});

const { sendAckToInfra } = require('./producer')

app.post("/saamsController/message", async (req, res) => {
  const reqBody = req.body;
  console.log("reqbody",reqBody)
   
  await sendAckToInfra(reqBody)
  return res.status(200).json('success');
})

app.listen(port, () => {
  console.log(
    `Server running on port ${port}. with db details ${process.env.SAAMS_CONTROLLER} and env is ${process.env.NODE_ENV}`
  );
});
