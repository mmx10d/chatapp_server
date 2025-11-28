const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
mongoose.connect("mongodb+srv://mmx10d:MjJxrCvUwsRuPZI1@cluster0.gspmy.mongodb.net/")
  .then(() => {
    console.log("Mongodb Connected ✔")
  })
  .catch(err => console.log("Mongodb ❌"))

const Schema = new mongoose.Schema({
  id: Number,
  content: String
});

const message = mongoose.model("message", Schema);

app.post("/messages", async (req, res) => {
  const NewMessage = message({
    id: req.body.id,
    content: req.body.content
  });

  try {
    const SavedMessage = await NewMessage.save();
    res.json(SavedMessage);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await message.find();
    res.json(messages);
  }
  catch (err) {
    res.status(400).json({message: err})
  }
})


app.listen(3232, () => {
  console.log("Run on port 3232 ✔");
})