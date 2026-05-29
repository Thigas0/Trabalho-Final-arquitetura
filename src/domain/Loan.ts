import { Book } from './Book';
import { User } from './User';

export class Loan {
    public returnDate: Date | null = null;
    public fineAmount: number = 0;

    constructor(
        public readonly id: string,
        public readonly book: Book,
        public readonly user: User,
        public readonly loanDate: Date,
        public readonly dueDate: Date
    ) {}

    isOverdue(currentDate: Date = new Date()): boolean {
        return this.returnDate === null && currentDate > this.dueDate;
    }

    getDaysOverdue(currentDate: Date = new Date()): number {
        if (!this.isOverdue(currentDate)) return 0;
        const diffTime = Math.abs(currentDate.getTime() - this.dueDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    returnBook(fineAmount: number, returnDate: Date = new Date()): void {
        if (this.returnDate !== null) {
            throw new Error("Este empréstimo já foi finalizado.");
        }
        this.returnDate = returnDate;
        this.fineAmount = fineAmount;
    }
}
