const User = require("../helper/schemas/loginschema");
const jwt = require("jsonwebtoken");
const secret = "HiteshPrajapati";

module.exports.login = async (req, res) => {
  User.findOne({ email: req.body.email })
    .select("email password")
    .exec(function (err, user) {
      if (err) {
        res.json({ success: false, message: "error" + err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "Email and password not provided !!!",
          });
        } else {
          if (!req.body.password) {
            res.json({ success: false, message: "place Enter password !!!" });
          } else {
            let validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              res.json({
                success: false,
                message: "Email and Password combination is incorrect !!!",
              });
            } else {
              var token = jwt.sign(
                { email: user.email, id: user._id },
                secret,
                { expiresIn: "24h" }
              );
              res.json({
                success: true,
                message: "Login Successfull",
                token: token,
              });
            }
          }
        }
      }
    });
};

// New login api Chek email And password

// module.exports.login = async (req, res) => {
//   if (req.body.email == null && req.body.password == null) {
//     res.json({
//       success: false,
//       message: "Place Enter User Email And Password !!",
//     });
//   } else
//     User.findOne({ email: req.body.email })
//       .select("email password")
//       .exec(function (err, user) {
//         if (err) {
//           res.json({ success: false, message: "error" + err });
//         } else {
//           if (!req.body.email) {
//             res.json({ success: false, message: "place Enter Email !!!" });
//           } else if (!req.body.password) {
//             res.json({ success: false, message: "place Enter password !!!" });
//           } else if (!user) {
//             res.json({
//               success: false,
//               // message: "Email and password not provided !!!",
//               message: "This User is Not Register !! Place Login First ",
//             });
//           } else {
//             let validPassword = user.comparePassword(req.body.password);
//             if (!validPassword) {
//               res.json({
//                 success: false,
//                 message: "Email and Password combination is incorrect !!!",
//               });
//             } else {
//               var token = jwt.sign(
//                 { email: user.email, id: user._id },
//                 secret,
//                 { expiresIn: "24h" }
//               );
//               res.json({
//                 success: true,
//                 message: "Login Successfull",
//                 token: token,
//               });
//             }
//           }
//         }
//       });
// };

// Login User Profile data

module.exports.userProfile = async (req, res) => {
  try {
    User.findOne({ email: req.decoded.email }, function (err, user) {
      if (err) {
        res.json({ success: false, message: "Error" + err });
      } else if (!user) {
        res.json({ success: false, message: "User Not Found" });
      } else {
        res.json({ success: true, message: "User Found", User: user });
      }
    });
  } catch (error) {
    res.json({ success: false, message: "server Error" + error });
  }
};

// edit Login User Data

module.exports.EditUserProfile = async (req, res) => {
  User.findOne({ id: req.params._id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "No user found" });
    } else {
      user.name = req.body.name;
      user.number = req.body.number;
      user.email = req.body.email;
      user.save(function (err) {
        if (err) {
          if (err.errors.name) {
            res.json({ success: false, message: "place Enter Your Name" });
          } else if (err.errors.number) {
            res.json({ success: false, message: "place Enter Your Number" });
          } else if (err.errors.email) {
            res.json({ success: false, message: "place Enter Your Email" });
          }
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
};
