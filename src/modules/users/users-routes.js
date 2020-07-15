//call router object created
const router = require("../../../routes/router");
const { getAllUsers, getOneUser, registerUser, deleteUser, updateUser } = require("./users-controllers");

//exec controller in router
router.get("/api/get-users", getAllUsers);
router.get("/api/get-user/:id", getOneUser);
router.post("/api/create-user", registerUser);
router.put("/api/update-user/:id", updateUser);
router.delete("/api/delete-user/:id", deleteUser);


module.exports = router;
