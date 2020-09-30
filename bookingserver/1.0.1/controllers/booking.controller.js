const Booking = require("../models/booking.model");
const _ = require("lodash");

const Counter = require("../models/Counter.model");

class BookingCtrl {
  create(req, res) {
    console.log("req.body:", JSON.stringify(req.body));
    console.log("req.file:", req.file);

    Counter.findOne({ type: "room" }).then(result => {
      const room = req.body;

      room.image = "dish/" + req.file.filename;

      room.id = result.count + 1;
      const roomModel = new Booking(room);
      roomModel
        .save()
        .then(result => {
          //resolve
          Counter.update(
            { type: "room" },
            { $inc: { count: 1 } },
            (err, ress) => {
              console.log("Counter updated:", ress);
            }
          );
          res.status(200).send(result);
        })
        .catch(err => {
          //reject
          console.log("Error", err);

          res
            .status(500)
            .send({ message: "Could not create a room", error: err });
        });
    });
  }

  getById(req, res) {
    const { id } = req.params;
    Booking.findById(id, (err, result) => {
      if (err || !result) res.status(404).send("no active id found");
      else res.status(200).send(result);
    });
  }

  update(req, res) {
    Booking.findOneAndUpdate(
      { id: req.params.id }, //parameter
      req.body, //request body
      { new: true }, //to get updated record as response on webservice hitted in postman otherwise previous data will get
      (err, result) => {
        if (err || !result) res.status(404).send("Could not updated");
        else res.status(200).send("Record Updated Successfully");
      }
    );
  }

  delete(req, res) {
    Booking.deleteOne({ id: req.params.id }, (err, result) => {
      if (err)
        res.status(500).send({ message: "Could not be deleted", error: err });
      else res.status(200).send("Deleted Successfully");
    });
  }

  getAll(req, res) {
    Booking.find()
      //.or([{ status: 0 }, { status: 1 }]) //whose status either 0 or 1
      .then(result => {
        // res.status(200).send(result);
        res.status(200).send(
          _.map(result, room => {
            return _.pick(room, [
              "id",
              "about",
              "tv",
              "seats",
              "whiteboard",

              "image",
              "price",
              "date"
            ]);
          })
        );
      })
      .catch(err => {
        res.status(404).send({ message: "Record not found", error: err });
      });
  }
}

module.exports = BookingCtrl;
