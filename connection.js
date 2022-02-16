const Pool = require('pg').Pool
    // local //
// const pool = new Pool({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "admin",
//     database: "Logimes"
// })

    // Server //
    
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Logime$2022",
    database: "Logimes"
})

module.exports = pool;