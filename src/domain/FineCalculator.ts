export interface FineStrategy {
    calculateFine(daysOverdue: number): number;
}

export class StudentFineStrategy implements FineStrategy {
    calculateFine(daysOverdue: number): number {
        // Estudantes pagam R$ 1,00 por dia de atraso
        return daysOverdue * 1.0;
    }
}

export class TeacherFineStrategy implements FineStrategy {
    calculateFine(daysOverdue: number): number {
        // Professores pagam R$ 0,50 por dia de atraso
        return daysOverdue * 0.5;
    }
}

export class VisitorFineStrategy implements FineStrategy {
    calculateFine(daysOverdue: number): number {
        // Visitantes pagam R$ 2,00 por dia de atraso
        return daysOverdue * 2.0;
    }
}

export class FineCalculator {
    private strategy: FineStrategy;

    constructor(strategy: FineStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: FineStrategy): void {
        this.strategy = strategy;
    }

    calculate(daysOverdue: number): number {
        if (daysOverdue <= 0) return 0;
        return this.strategy.calculateFine(daysOverdue);
    }
}
