const books = require("../helper/schemas/book");
const fs = require("fs");

// Create Book

module.exports.createbook = (req, res) => {
  if (!req.file) {
    res.json({ success: false, message: "Plz Select Book Img!!!" });
  }

  let user = new books();
  user.name = req.body.name;
  user.desc = req.body.desc;
  user.price = req.body.price;
  user.quantity = req.body.quantity;
  user.book = req.file.filename;
  user.bookpath = "http://localhost:9000/" + req.file.path;

  if (
    req.body.name == null ||
    req.body.desc == null ||
    req.body.price == null ||
    req.body.quantity == null
  ) {
    res.status(401).json({ message: "All Fillds are required" });
  } else {
    user.save(function (err) {
      if (err) {
        if (err.errors != null) {
          if (err.errors.name) {
            res.json({ success: false, message: "Plz Enter Name" });
          } else if (err.errors.desc) {
            res.json({ success: false, message: "Plz Enter Description" });
          } else if (err.errors.price) {
            res.json({ success: false, message: "Plz Enter Price" });
          } else if (err.errors.quantity) {
            res.json({ success: false, message: "Plz Enter quantity" });
          }
        } else {
          res.json({ success: false, message: err });
        }
      } else {
        res
          .status(200)
          .json({ success: true, message: "Book Add successfully" });
      }
    });
  }
};

// Get  All Books
module.exports.getbooks = async function (req, res) {
  try {
    const allbooks = await books.find();
    res.send(allbooks);
  } catch (error) {
    res.send(error);
  }
};

// Delet One Book

module.exports.deletbook = (req, res) => {
  books.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ success: false, message: "err" + err });
    } else {
      if (!data) {
        res.json({ success: false, message: "information not found" });
      } else {
        if (fs.existsSync(`./uploads/${data.book}`)) {
          fs.unlinkSync(`./uploads/${data.book}`);
          res.json({ success: true, message: " Book Deleted" });
        } else {
          res.json({ success: true, message: " Book Deleted" });
        }
      }
    }
  });
};

// get book by id

module.exports.singlebook = async (req, res) => {
  try {
    books.findById(req.params.id, function (err, data) {
      res.send(data);
    });
  } catch (error) {
    res.json(error);
  }
};

// update book
module.exports.updatebook = (req, res) => {
  books.findOne({ id: req.params._id }, function (err, data) {
    if (err) throw err;
    if (!data) {
      res.json({ success: false, message: "Pleace fill all data" });
    }
    if (!req.file) {
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.quantity = req.body.quantity;
      data.price = req.body.price;
      data.save(function (err) {
        if (err) {
          if (err.errors != null) {
            if (err.errors.name) {
              res.json({
                success: false,
                message: "Place Enter  Book Name",
              });
            } else if (err.errors.desc) {
              res.json({ success: false, message: "Place Enter  Description" });
            } else if (err.errors.quantity) {
              res.json({ success: false, message: "Place Enter  Quantity" });
            } else if (err.errors.price) {
              res.json({ success: false, message: "Place Enter Price" });
            }
          } else {
            res.json({ success: false, message: "err" + err });
          }
        } else {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated !" });
        }
      });
    } else {
      fs.unlinkSync(`./uploads/${data.book}`);
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.quantity = req.body.quantity;
      data.price = req.body.price;
      data.book = req.file.filename;
      data.bookpath = "http://localhost:9000/" + req.file.path;
      data.save(function (err) {
        if (err) {
          if (err.errors != null) {
            if (err.errors.name) {
              res.json({
                success: false,
                message: "Place Enter  Book Name",
              });
            } else if (err.errors.desc) {
              res.json({ success: false, message: "Place Enter  Decriprtion" });
            } else if (err.errors.quantity) {
              res.json({ success: false, message: "Place Enter  Quantity" });
            } else if (err.errors.price) {
              res.json({ success: false, message: "Place Enter Price" });
            }
          } else {
            res.json({ success: false, message: "err" + err });
          }
        } else {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated !" });
        }
      });
    }
  });
};

// shearch Api Books

module.exports.shearchBooks = async (req, res) => {
  try {
    const data = await books.find({
      $or: [{ name: { $regex: ".*" + req.params.key + ".*", $options: "i" } }],
    });

    if (data.length > 0) {
      res.json({ success: true, message: "Data Found", info: data });
    } else {
      res.json({ success: false, message: "No Data Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "ERROR" + error });
  }
};
