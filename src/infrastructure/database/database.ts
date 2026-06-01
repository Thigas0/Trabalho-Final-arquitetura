import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database | null = null;

export async function getDbConnection(): Promise<Database> {
    if (!dbInstance) {
        dbInstance = await open({
            filename: ':memory:', // Banco em memória para facilitar os testes e simplificar
            driver: sqlite3.Database
        });
        await initializeSchema(dbInstance);
    }
    return dbInstance;
}

async function initializeSchema(db: Database) {
    await db.exec(`
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            role TEXT NOT NULL
        );

        CREATE TABLE books (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            isbn TEXT NOT NULL,
            state TEXT NOT NULL
        );

        CREATE TABLE loans (
            id TEXT PRIMARY KEY,
            book_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            loan_date TEXT NOT NULL,
            due_date TEXT NOT NULL,
            return_date TEXT,
            fine_amount REAL,
            FOREIGN KEY(book_id) REFERENCES books(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);
}
