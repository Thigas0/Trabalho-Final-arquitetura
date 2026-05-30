import { LoanRepository } from '../../domain/repositories/LoanRepository';
import { BookRepository } from '../../domain/repositories/BookRepository';
import { FineCalculator, StudentFineStrategy, TeacherFineStrategy, VisitorFineStrategy } from '../../domain/FineCalculator';
import { DomainEventPublisher } from '../../domain/Observer';
import { BookReturnedEvent } from '../events/BookReturnedEvent';

export class ReturnBookUseCase {
    constructor(
        private loanRepo: LoanRepository,
        private bookRepo: BookRepository,
        private eventPublisher: DomainEventPublisher<BookReturnedEvent>
    ) {}

    async execute(loanId: string, currentDate: Date = new Date()): Promise<void> {
        const loan = await this.loanRepo.findById(loanId);
        if (!loan) {
            throw new Error("Empréstimo não encontrado.");
        }

        const book = loan.book;
        const user = loan.user;

        // Padrão State: muda de Emprestado para Disponível
        book.returnBook(); 

        // Padrão Strategy: Seleciona a estratégia de multa baseado no tipo de usuário
        let strategy;
        switch (user.role) {
            case 'Student': strategy = new StudentFineStrategy(); break;
            case 'Teacher': strategy = new TeacherFineStrategy(); break;
            case 'Visitor': strategy = new VisitorFineStrategy(); break;
            default: strategy = new VisitorFineStrategy();
        }

        const calculator = new FineCalculator(strategy);
        const daysOverdue = loan.getDaysOverdue(currentDate);
        const fine = calculator.calculate(daysOverdue);

        // Finaliza o empréstimo
        loan.returnBook(fine, currentDate);

        await this.loanRepo.save(loan);
        await this.bookRepo.save(book);

        // Padrão Observer: notifica que o livro foi devolvido
        this.eventPublisher.notify(new BookReturnedEvent(book, currentDate));
    }
}
