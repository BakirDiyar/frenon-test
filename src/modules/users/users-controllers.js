const { getUsers, getUserById, addUser, removeUser, updUser } = require("./users-services");

//controller receive request of client
async function getAllUsers(req, res) {
  
  res.send(await getUsers());
}

async function getOneUser(req, res) {
  
  res.send(await getUserById(req.params.id));
}

async function registerUser(req, res){
  res.send(await addUser(req.body))
}

async function deleteUser(req, res){
  res.send(await removeUser(req.params.id))
}


async function updateUser(req, res){

  res.send(await updUser(req.params.id, req.body))
}


async function loginUser(req, res){
  res.send(await signin(req.body))
}


module.exports = { getAllUsers, registerUser, getOneUser, deleteUser, updateUser};
