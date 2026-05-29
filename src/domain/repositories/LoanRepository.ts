import { Loan } from '../Loan';

export interface LoanRepository {
    findById(id: string): Promise<Loan | null>;
    save(loan: Loan): Promise<void>;
}
