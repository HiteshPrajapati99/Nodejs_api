const User = require("../helper/schemas/loginschema");

module.exports.register = async (req, res) => {
  try {
    if (
      req.body.name == null ||
      req.body.number == null ||
      req.body.email == null ||
      req.body.password == null
    ) {
      res.json({ success: false, message: "All Fields Are Mandatory !!" });
    } else {
      const preUser = await User.findOne({ email: req.body.email });
      if (preUser) {
        res.json({
          success: false,
          message: "This account is already exists !!  ",
        });
      } else {
        const user = new User();
        user.name = req.body.name;
        user.number = req.body.number;
        user.email = req.body.email;
        user.password = req.body.password;

        if (req.body.password != req.body.c_password) {
          res.json({
            success: false,
            message: "password and confirm password not match",
          });
        } else {
          user.save(function (err) {
            if (err) {
              if (err.errors != null) {
                if (err.errors.name) {
                  res.json({
                    success: false,
                    message: "Required minimum digits 3 of  Name",
                  });
                } else if (err.errors.email) {
                  res.json({
                    success: false,
                    message: err.errors.email.message,
                  });
                } else if (err.errors.password) {
                  res.json({
                    success: false,
                    message: err.errors.password.message,
                  });
                } else {
                  res.json({ success: false, message: err });
                }
              }
            } else {
              res.json({
                success: true,
                message: "You have registered successfully...",
              });
            }
          });
        }
      }
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};
