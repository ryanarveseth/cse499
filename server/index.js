/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling.
 * They're for information purposes only.
 *
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course.
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Accuracy = require("./Accuracy");
const fetch = require('node-fetch');

require('dotenv').config();

const cors = require('cors');
const corsOptions = {
  origin: "https://ra-senior-project.herokuapp.com/",
  optionsSuccessStatus: 200
};

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGO_URL = process.env.MONGO_URL;

const app = express();


const getTotalAccuracy = (totalAccuracy) => {
  const total = totalAccuracy.length;
  const accuracy = totalAccuracy.filter(attempt => attempt.accurate === 1).length;

  console.log({total: total, accuracy: accuracy});

  if (total === 0) {
    return ({percentage: 0});
  }

  return ({percentage: ((accuracy / total) * 100).toFixed(2) });
}


app.use(express.static(path.resolve(__dirname, '../ui/build')))
  .use(bodyParser({extended: false}))
  .use(cors(corsOptions))
  .use(flash())
  .post("/api/add-to-accuracy", (req, res) => {
    const {accurate} = req.body;
    const newAccuracy = new Accuracy();

    console.log("body", req.body);

    newAccuracy.accurate = accurate;
    return newAccuracy.save().then(() => {
      Accuracy
        .find()
        .then(totalAccuracy => {
          return res.send(getTotalAccuracy(totalAccuracy))
        })
    });
  })
  .get("/api/get-accuracy", (req, res) => {

    console.log("getting accuracy");

    return Accuracy
      .find()
      .then(totalAccuracy => {
        return res.send(getTotalAccuracy(totalAccuracy))
      });
  })
  .get("/api/get-dog-breeds", async (req, res) => {
    console.log("process.env.dog_api", process.env.DOG_API_URL);
    const dogs = await (await fetch(process.env.DOG_API_URL, {headers: {"x-api-key": process.env.DOG_API_KEY}})).json();
    let breeds = dogs.map(breed => breed.name.toLowerCase());
    breeds = ["terrier", "pomeranian", ...breeds];

    res.send(breeds);
  });

mongoose
  .connect(
    MONGO_URL, options
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });

