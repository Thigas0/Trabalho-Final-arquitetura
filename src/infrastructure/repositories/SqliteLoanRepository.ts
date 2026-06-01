import { LoanRepository } from '../../domain/repositories/LoanRepository';
import { Loan } from '../../domain/Loan';
import { getDbConnection } from '../database/database';
import { SqliteBookRepository } from './SqliteBookRepository';
import { SqliteUserRepository } from './SqliteUserRepository';

export class SqliteLoanRepository implements LoanRepository {
    private bookRepo = new SqliteBookRepository();
    private userRepo = new SqliteUserRepository();

    async findById(id: string): Promise<Loan | null> {
        const db = await getDbConnection();
        const row = await db.get('SELECT * FROM loans WHERE id = ?', id);
        
        if (!row) return null;

        const book = await this.bookRepo.findById(row.book_id);
        const user = await this.userRepo.findById(row.user_id);

        if (!book || !user) throw new Error("Inconsistência de dados: Livro ou Usuário do empréstimo não encontrados.");

        const loan = new Loan(
            row.id,
            book,
            user,
            new Date(row.loan_date),
            new Date(row.due_date)
        );

        if (row.return_date) {
            loan.returnDate = new Date(row.return_date);
            loan.fineAmount = row.fine_amount;
        }

        return loan;
    }

    async save(loan: Loan): Promise<void> {
        const db = await getDbConnection();
        await db.run(
            `INSERT INTO loans (id, book_id, user_id, loan_date, due_date, return_date, fine_amount) 
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET 
             return_date = excluded.return_date, 
             fine_amount = excluded.fine_amount`,
            [
                loan.id, 
                loan.book.id, 
                loan.user.id, 
                loan.loanDate.toISOString(), 
                loan.dueDate.toISOString(), 
                loan.returnDate ? loan.returnDate.toISOString() : null, 
                loan.fineAmount
            ]
        );
    }
}
