import { BookRepository } from '../../domain/repositories/BookRepository';
import { Book, AvailableState, LoanedState, OverdueState, LostState, MaintenanceState } from '../../domain/Book';
import { getDbConnection } from '../database/database';

export class SqliteBookRepository implements BookRepository {
    async findById(id: string): Promise<Book | null> {
        const db = await getDbConnection();
        const row = await db.get('SELECT * FROM books WHERE id = ?', id);
        
        if (!row) return null;

        let state;
        switch (row.state) {
            case 'Available': state = new AvailableState(); break;
            case 'Loaned': state = new LoanedState(); break;
            case 'Overdue': state = new OverdueState(); break;
            case 'Lost': state = new LostState(); break;
            case 'Maintenance': state = new MaintenanceState(); break;
            default: state = new AvailableState();
        }

        return new Book(row.id, row.title, row.author, row.isbn, state);
    }

    async save(book: Book): Promise<void> {
        const db = await getDbConnection();
        const stateName = book.getState().constructor.name.replace('State', ''); // Ex: AvailableState -> Available
        
        await db.run(
            `INSERT INTO books (id, title, author, isbn, state) 
             VALUES (?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET state = excluded.state`,
            [book.id, book.title, book.author, book.isbn, stateName]
        );
    }
}
