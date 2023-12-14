import pool from './mysql.js';



export class BooksSQL {

    async queryDatabase() {
        const [rows, fields] = await pool.query('SELECT * FROM books');
        console.log(rows);
    }
}