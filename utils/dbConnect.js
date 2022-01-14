const mysql = require("mysql")
const util = require('util')


export default async function dbConnect() {

    const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    // mysql is not a promise, so we need the "util" package to transforme mysql connection
    // into a promisse and use async/await
    const query = util.promisify(db.query).bind(db);
    return query

}

