const express = require("express");
const router = express.Router();
const authChek = require("../middlewares/auth");
const Login = require("../controller/login");
const register = require("../controller/register");
const upload = require("../middlewares/bookimg");
const booksapi = require("../controller/books");
const UserApi = require("../controller/User");
// const hederchek = require("../middlewares/heders");

// Register User Api
router.post("/register", register.register);

// Login User Api
router.post("/login", Login.login);
router.get("/profile", authChek, Login.userProfile);
router.put("/profile/edit/:id", authChek, Login.EditUserProfile);

// Users Api
router.post("/createuser", authChek, UserApi.createUser);
router.get("/users", authChek, UserApi.AllUser);
router.get("/getuser/:id", authChek, UserApi.SingleUser);
router.put("/edit/user/:id", authChek, UserApi.updateUser);
router.delete("/user/:id", authChek, UserApi.DeletUser);

// Book Api
router.post("/addbook", upload.single("book"), authChek, booksapi.createbook);
router.get("/getbooks", authChek, booksapi.getbooks);
router.get("/books/:id", authChek, booksapi.singlebook);
router.put("/books/:id", upload.single("book"), authChek, booksapi.updatebook);
router.delete("/books/:id", authChek, booksapi.deletbook);

// Shearch Api

// Books Search
router.get("/sherch/book/:key", booksapi.shearchBooks);
// Users Search
router.get("/search/user/:key", UserApi.SearchUser);

//Pagination APi

// Users

router.get("/users/get", UserApi.paginatedUser);

module.exports = router;
