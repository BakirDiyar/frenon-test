const {
  _get,
  _insert,
  _getOne,
  _getById,
  _delete,
  _update,
} = require("./users-models");
const sign = require("../../helpers/jwt");
const { secret } = require("../../../environments/env");
//service business logic

async function signin(user) {
  let resp = {
    status: true,
    message: "Usuarios logueado existosamente",
    data: {},
  };

  try {
    let query = "select * from users where email = $1";
    let userExist = await _getOne(query, user.email);

    if (userExist) {
      let { password = null } = userExist;
      let pass = user.password;
      if (password === pass) {
        let userData = {
          name: userExist.name,
          email: userExist.email,
          phone: userExist.phone,
        };
        let token = sign(userData);
        return (resp.data = { ...resp, data: userData, token });
      }

      return (resp = {
        ...resp,
        status: false,
        message: "credenciales incorrectas, intente nuevamente",
      });
    } else {
      resp = {
        ...resp,
        status: false,
        message: "el usuario no está registrado en el sistema",
      };
    }
  } catch (error) {
    console.log(error);
    resp.status = false;
    resp.message = "Hubo un problema al ingresar al sistema";
  }

  return resp;
}

async function getUsers() {
  let resp = {
    status: true,
    message: "Usuarios obtenidos existosamente",
    data: { users: [] },
  };

  try {
    let query = "select * from users ";
    let users = ([] = await _get(query));

    if (users && users.length) {
      users.forEach(user =>{
        delete user.password 
      })
      resp.data.users = users;
    }
  } catch (error) {
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
      resp = {
        ...resp,
        status: false,
        message: "usuario no encontrado en el sistema",
      };
    }
  } catch (error) {
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
    let { name, phone, address, email, password } = user;
    console.log(user);
    const query = `select email from users where email= $1`;
    if ((name, phone, address, email, password)) {
      let userExist = await _getOne(query, email);
      if (!userExist) {
        await _insert([name, phone, address, email, password]);
      } else {
        resp = {
          ...resp,
          status: false,
          message: "Ya hay un usuario con ese email, intente con otro",
        };
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
    let stat = "";
    let props = [];
    props = Object.keys(data);
    let values = [];
    let i = 0;

    const queryGet = `select * from users where id= $1`;

    let userExist = await _getOne(queryGet, userId);
    if (userExist) {
      if (props && props.length) {
        props.forEach((p, ix) => {
          i = ix + 1;
          stat += p + "= $" + i;
          values.push(data[p]);
          if (ix < props.length - 1) {
            stat += ", ";
          }
        });

        query += stat + " where id =" + userId;

        await _update(query, values);
      } else {
        resp = {
          ...resp,
          status: false,
          message: "Debe proveer al menos una propiedad para actualizar",
        };
      }
    } else {
      resp = {
        ...resp,
        status: false,
        message: "El usuario no se encuentra en el sistema",
      };
    }
  } catch (error) {
    console.log(error);
    resp = {
      ...resp,
      status: false,
      message: "Hubo un problema al actualizar el usuario, intente nuevamente",
    };
  }
  return resp;
}

module.exports = {
  getUsers,
  addUser,
  getUserById,
  removeUser,
  updUser,
  signin,
};
