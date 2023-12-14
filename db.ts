import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import { dbConfig } from './dbconfig.js';

const poolOptions: PoolOptions = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

export interface Book {
    id?: number;
    name: string;
    author: string;
}

export class BooksDatabase {
    private db: Pool;

    constructor() {
        this.db = createPool(poolOptions);
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Get all books
    async getBooks(): Promise<Book[]> {
        const [rows] = await this.db.query('SELECT * FROM books');
        return rows as Book[];
      }

    // Get a single book by id
    // async getBook(id: number) {
    //     return this.db.query(`SELECT * FROM books WHERE id = ${id}`);
    // }
    async getBook(bookId: number): Promise<Book[] | null> {
        const query = 'SELECT * FROM books WHERE id = ?';
        const [rows] = await this.db.execute(query, [bookId]);
      
        return rows as Book[];
      }

    // Add a book
    async addBook(book: Book): Promise<void> {
        const { name, author } = book;
        const query = 'INSERT INTO books (name, author) VALUES (?, ?)';
        const values = [name, author];
      
        await this.db.execute(query, values);
    }

    // Update a book
    async updateBook(id: number, book: Book) {
        return this.db.execute(`UPDATE books SET name = '${book.name}', author = '${book.author}' WHERE id = ${id}`)
    }

    // Delete a book
    async deleteBook(id: number) {
        return this.db.execute(`DELETE FROM books WHERE id = ${id}`)
    }

    // Initialize the database
    async init() {
        return 
    }
}
