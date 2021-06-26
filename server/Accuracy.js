const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accuracySchema = new Schema({
  time: {type: Date, default: new Date().getTime()},
  accurate: {type: Number, required: true}
});

module.exports = mongoose.model("Accuracy", accuracySchema);