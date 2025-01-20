const router = require("express").Router();

const { registerUser, login, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/adminMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
