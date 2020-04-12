const express = require("express");
const router = express.Router();
const dbRtns = require("./setup");

// define a default route to retrieve all alerts
router.get("/", async (req, res) => {
  let conn;
  try {
    let output = await dbRtns.setup();
    res.status(200).send({ output: output });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("setup failed - internal server error");
  }
});

module.exports = router;
