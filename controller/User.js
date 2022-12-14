const User = require("../helper/schemas/userschema");

// Create User

module.exports.createUser = async function (req, res) {
  let user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.gender = req.body.gender;
  user.age = req.body.age;
  user.address = req.body.address;

  if (
    req.body.firstname == null ||
    req.body.lastname == null ||
    req.body.gender == null ||
    req.body.age == null ||
    req.body.address == null
  ) {
    res.json({ success: false, message: "Place Enter User Datails" });
  } else {
    user.save(function (err) {
      if (err) {
        if (err.errors != null) {
          if (err.errors.firstname) {
            res.json({ success: false, message: "Place Enter First Name" });
          } else if (err.errors.lastname) {
            res.json({ success: false, message: "Place Enter Last Name" });
          } else if (err.errors.gender) {
            res.json({ success: false, message: "Place Select Gender" });
          } else if (err.errors.age) {
            res.json({ success: false, message: "Place Enter Age" });
          } else if (err.errors.address) {
            res.json({ success: false, message: "Place Enter Address" });
          } else if (err.errors) {
            res.json({ success: false, message: "Errr" + err });
          }
        }
      } else {
        res
          .status(200)
          .json({ success: true, message: "User Add successfully" });
      }
    });
  }
};

// Get All Users

module.exports.AllUser = (req, res) => {
  // res.send('hello');
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Find User Using ID

module.exports.SingleUser = (req, res) => {
  User.findById(req.params.id, function (err, data) {
    res.send(data);
  });
};

// Delete User Using ID

module.exports.DeletUser = function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: "User Deleted successfully" });
    }
  });
};

// Edit User

module.exports.updateUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    if (!data) {
      res.json({ success: false, message: "No user found" });
    } else {
      data.firstname = req.body.firstname;
      data.lastname = req.body.lastname;
      data.age = req.body.age;
      data.gender = req.body.gender;
      data.address = req.body.address;
      data.save(function (err) {
        if (err) {
          if (err.errors.firstname) {
            res.json({ success: false, message: "Place Enter First Name" });
          } else if (err.errors.lastname) {
            res.json({ success: false, message: "Place Enter Last Name" });
          } else if (err.errors.age) {
            res.json({ success: false, message: "Place Enter Your Age" });
          } else if (err.errors.gender) {
            res.json({ success: false, message: "Place Enter Your Gender" });
          } else if (err.errors.address) {
            res.json({ success: false, message: "Place Enter Your Address" });
          } else if (err) {
            res.json({ success: false, message: "Error" + err });
          }
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
};

// Search User

module.exports.SearchUser = async function (req, res) {
  try {
    const data = await User.find({
      $or: [
        {
          firstname: { $regex: req.params.key, $options: "i" },
        },
        {
          lastname: { $regex: req.params.key, $options: "i" },
        },
      ],
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

// Pagination User

module.exports.paginatedUser = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // const result = await User.slice(startIndex, endIndex);
    const result = await (await User.find()).slice(startIndex, endIndex);

    res.json(result);
  } catch (error) {
    res.json("errr" + error);
  }
};
