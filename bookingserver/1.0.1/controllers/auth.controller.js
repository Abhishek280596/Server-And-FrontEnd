const jwt = require("jsonwebtoken");

function validateToken(req, res) {
  const token = req.body;
  if (token) {
    jwt.verify(token, process.env.Key, (err, payload) => {
      if (err) {
        res.status(400).send({ message: "invalid token", error: err });
      } else {
        const newToken = jwt.sign(payload, "abhishek");
        res.set({ "X-token": newToken });
        res.status(200).send({ message: "New token created" });
      }
    });
  }
}

module.exports = validateToken;
