import { BookRepository } from '../../domain/repositories/BookRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { LoanRepository } from '../../domain/repositories/LoanRepository';
import { Loan } from '../../domain/Loan';
import { randomUUID } from 'crypto';

export class BorrowBookUseCase {
    constructor(
        private bookRepo: BookRepository,
        private userRepo: UserRepository,
        private loanRepo: LoanRepository
    ) {}

    async execute(userId: string, bookId: string): Promise<Loan> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        const book = await this.bookRepo.findById(bookId);
        if (!book) {
            throw new Error("Livro não encontrado.");
        }

        // Tenta emprestar o livro (isso vai testar o Padrão State)
        book.borrow();

        // 14 dias para devolução
        const loanDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); 

        const loan = new Loan(
            randomUUID(),
            book,
            user,
            loanDate,
            dueDate
        );

        await this.loanRepo.save(loan);
        await this.bookRepo.save(book); // Salva o novo estado do livro

        return loan;
    }
}
