const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

// services d'auth
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

const authControllers = require("./controllers/authControllers");
const articleControllers = require("./controllers/articleControllers");
const userControllers = require("./controllers/userControllers");
const fileControllers = require("./controllers/fileControllers");

// Auth
router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des articles
router.get("/api/articles", articleControllers.browse);
router.get("/api/articles/:id", articleControllers.read);
router.post("/api/articles", verifyToken, articleControllers.add);
router.put("/api/articles/:id", verifyToken, articleControllers.edit);
router.delete("/api/articles/:id", verifyToken, articleControllers.destroy);

// Gestion des users
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, verifyToken, userControllers.add);
router.put("/api/users/:id", hashPassword, verifyToken, userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des avatars
router.post(
  "/api/avatars",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  userControllers.updateAvatar
);
router.get("/api/avatars/:fileName", fileControllers.sendAvatar);

module.exports = router;
