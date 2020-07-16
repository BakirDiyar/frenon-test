//call router object created
const router = require("../../../routes/router");
const {loginUser, getAllUsers, getOneUser, registerUser, deleteUser, updateUser } = require("./users-controllers");
const auth = require("../../../middlewares/auth")
//exec controller in router
router.post("/api/login", loginUser);
router.get("/api/get-users", auth, getAllUsers);
router.get("/api/get-users/:id", getOneUser);
router.post("/api/create-users", registerUser);
router.put("/api/update-users/:id", updateUser);
router.delete("/api/delete-users/:id", deleteUser);


module.exports = router;
