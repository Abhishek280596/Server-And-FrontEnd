const User = require("../models/user.model");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Counter = require("../models/Counter.model");

function encrypt(value) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
}

class UserCtrl {
  create(req, res) {
    console.log("req.body:", JSON.stringify(req.body));
    console.log("req.file:", req.file);

    const user = req.body;

    user.password = encrypt(user.password);

    Counter.findOne({ type: "user" }).then((result) => {
      user.image = "dish/" + req.file.filename;

      user.id = result.count + 1;

      const staff = new User(user);
      staff
        .save()
        .then((result) => {
          Counter.update(
            { type: "user" },
            { $inc: { count: 1 } },
            (err, ress) => {
              console.log("counter updated", ress); //to update counter and print in console
            }
          ); //to increament counter
          res.status(200).send(result);
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "could not create user", error: err });
        });
    });
  }

  update(req, res) {
    User.findOneAndUpdate({ id: req.params.id }, req.body, (err, result) => {
      if (err || !result) res.status(404).send("could not updated");
      else res.status(200).send(result);
    });
  }

  delete(req, res) {
    // User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    //   if (err || result) res.status(404).send("could not updated");
    //   else res.status(200).send(result);
    // });
    User.deleteOne({ id: req.params.id }, (err, result) => {
      if (err)
        res.status(500).send({ message: "could not be deleted", error: err });
      else res.status(200).send("deleted successfully");
    });
  }

  // getSingle(req, res) {
  //   const { id, email } = req.params;
  //   User.findOne()
  //     .or([
  //       { _id: id.length == 24 ? id : "pppppppppppppppppppppppp" },
  //       { email: req.params.id }
  //     ])
  //     .then(result => res.status(200).send(result))
  //     .catch(err => res.status(404).send(err));
  // }

  getById(req, res) {
    const { id } = req.params;
    User.findById(id, (err, result) => {
      if (err || !result) res.status(404).send("no active id found");
      else res.status(200).send(result);
    });
  }

  getByEmail(req, res) {
    const { email } = req.params;
    User.findOne({ email: email }, (err, result) => {
      if (err || !result) res.status(404).send("no active email found");
      else res.status(200).send(result);
    });
  }

  getAll(req, res) {
    User.find()
      // .or([{ status: 0 }, { status: 1 }])
      .then((result) => {
        // res.status(200).send(result);

        res.status(200).send(
          _.map(result, (user) => {
            return _.pick(user, [
              "id",
              "name",
              "mobile",
              "email",
              "gender",

              "hobbies",
              "image",
              "password",
            ]);
          })
        );
      })
      .catch((err) => {
        res.status(400).send({ message: "records not found", error: err });
      });
  }

  authenticate(req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, result) => {
      if (err || !result) {
        res.status(404).send("invalid email or inactive");
      } else {
        if (password != result.password) {
          res.status(404).send("invalid password");
        } else {
          const token = jwt.sign({ role: result.role }, "abhishek");
          res.set({ "X-token": token });
          res
            .status(200)
            .send(_.pick(result, ["id", "name", "mobile", "email"]));
        }
      }
    });
  }
}
module.exports = UserCtrl;
