const { _get, _insert, _getOne, _getById, _delete, _update } = require("./users-models");
const sign = require("../../helpers/jwt");
//service business logic

async function getUsers(user) {
  let resp = {
    status: true,
    message: "Usuarios obtenidos existosamente",
    data: { users: [] },
  };

  try {
    let query = "select * from users ";
    let users = ([] = await _get(query));

    console.log(users);
    if (users && users.length) {
      resp.data.users = users;
    }
  } catch (error) {
    console.log(error);
    resp.status = false;
    resp.message = "Hubo un problema al obtener los usuarios.....";
  }

  return resp;
}

async function getUserById(userId) {
  let resp = {
    status: true,
    message: "Usuarios obtenidos existosamente",
    data: { user: {} },
  };

  try {
    let query = `select * from users where id = $1`;
    userId = userId || 0;
    let user = await _getById(query, +userId);

    if (user) {
      resp.data.user = user;
    } else {
      resp = { ...resp, status: false, message: "usuario no encontrado" };
    }
  } catch (error) {
    console.log(error);
    resp.status = false;
    resp.message = "Hubo un problema al obtener los usuarios.....";
  }

  return resp;
}

async function addUser(user) {
  let resp = {
    status: true,
    message: "Usuario registrado existosamente",
    data: {},
  };

  try {
    let { name, phone, address, email } = user;
    console.log(user);
    const query = `select email from users where email= $1`
    if ((name, phone, address, email)) {
      let  userExist= await _getOne(query, email)
      if(!userExist){
        await _insert([name, phone, address, email]);
      }else{
        resp = {...resp, status:false, message:"Ya hay un usuario con ese email, intente con otro"}
      }
    } else {
      resp = {
        ...resp,
        status: false,
        message: "Debe proveer los datos requeridos",
      };
    }
  } catch (error) {
    console.log(error);
    resp = {
      ...resp,
      status: false,
      message: "Hubo un problema al registrar el usuario, intente nuevamente",
    };
  }
  return resp;
}

async function removeUser(userId) {
  let resp = {
    status: true,
    message: "Usuario borrado del sistema exitosamente",
    data: {},
  };

  try {
    await _delete(+userId);
  } catch (error) {
    console.log(error);
    resp.status = false;
    resp.message = "Hubo un problema al obtener los usuarios.....";
  }

  return resp;
}

async function updUser(userId, data) {
  let resp = {
    status: true,
    message: "Usuario actualizado existosamente",
    data: {},
  };

  try {
    let query = "update users set ";
    let stat = ''
    let props = Object.keys(data);
    let values = [];

    props.forEach((p, i) => {
      i=i+1
      stat += stat += p + "= $" + i;
      values.push(data[p])
      if (i < props.length - 1) {
        stat += ", ";
      }
    });

    query += stat + " where id =" + userId;
    await _update(query, values)

  } catch (error) {
 
    resp = {
      ...resp,
      status: false,
      message: "Hubo un problema al actualizar el usuario, intente nuevamente",
    };
  }
  return resp;
}



async function signin(user) {
  let resp = {
    status: true,
    message: "Usuario logueado existosamente",
    data: {},
  };

  try {
    const { email, password } = user;
    const userExist = await _findOne({ email: email });
    console.log(userExist);
    const passOk = userExist.comparePasswords(password);
    if (userExist) {
      if (userExist.password === password) {
        delete userExist.password;
        let tk = sign(userExist);
        let userFound = {
          name: userExist.name,
          phone: userExist.phone,
          token: tk,
        };
        resp = { ...resp, data: userFound };
      } else {
        resp = {
          ...resp,
          status: false,
          message: "Las credenciales son incorrectas",
        };
      }
    } else {
      resp = {
        ...resp,
        status: false,
        message: "El usuario no existe, intente con otras credenciales",
      };
    }
  } catch (error) {
    console.log(error.message);
    resp = {
      ...resp,
      status: false,
      message: "Hubo un problema, intente nuevamente",
    };
  }
  return resp;
}

module.exports = {
  getUsers,
  addUser,
  getUserById,
  removeUser,
  signin,
  updUser,
};
