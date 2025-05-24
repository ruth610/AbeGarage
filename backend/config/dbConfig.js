// promise is used to making the database requests asyncrouncely
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10, // Set the maximum number of connections in the pool
});


// we use this function to make the database requests
async function query(sql,params){
    try {
        const [rows] = await db.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}
// export the query function
module.exports = {query , db};
