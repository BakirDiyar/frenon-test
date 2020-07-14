const { Pool } = require("pg")

let pool 
try {
pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "frenon-db",
  password: "bakdev",
  port: 5432,
});
 
} catch (error) {
    console.log(errorr);
}

module.exports = pool;