const express = require("express");
const router = express.Router();
const { storeReturnTo } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
