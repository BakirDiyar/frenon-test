const conexion = require("../../../databases/postgresql");

module.exports = {
  async _insert(data) {
    let userNew = await conexion.query(
      `insert into users
        (name, phone, address, email, password)
        values
        ($1, $2, $3, $4, $5)`,
      data
    );
    return userNew;
  },

  async _get(query) {
    const users = await conexion.query(query);
    return users.rows;
  },

  async _getById(query, id) {
    const user = await conexion.query(query, [id]);
    delete user.rows[0].password
    return user.rows[0];
  },

  async _getOne(query, filter) {
    const user = await conexion.query(query, [filter]);
    return user.rows[0];
  },

  async _update(query, data) {
    const res = conexion.query(query, data);
    return res;
  },

  async _delete(id) {
    const res = conexion.query(
      `delete from users
        where id = $1`,
      [id]
    );
    return res;
  },
};
