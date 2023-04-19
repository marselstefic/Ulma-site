const express = require("express");
const router = express.Router();
const API = require("../controllers/api");

router.get("/fetch", API.fetchAllPost);
router.get("/:id", API.fetchPostById);
router.get("/create", API.createPost);
router.get("/update", API.updatePost);
router.get("/delete", API.DeletePost);

module.exports = router;