const router = require("express").Router(),
  User = require("../models/User"),
  auth = require("../auth");

router.post("/", async (req, res) => {
  // metodo CREATE
});

router.post("/login", async (req, res) => {
  //Login de usuario
});

router.post("/logout", auth, async (req, res) => {
  // eliminar token local
});

router.post("/logoutall", auth, async (req, res) => {
  // eliminar todos los tokens
});

module.exports = router;
