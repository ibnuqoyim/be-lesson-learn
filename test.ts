// contoh_penggunaan.ts
import pool from './mysql.js';

async function queryDatabase() {
  const [rows, fields] = await pool.query('SELECT * FROM books');
  console.log(rows);
}

queryDatabase();