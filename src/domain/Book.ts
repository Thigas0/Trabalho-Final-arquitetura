export interface BookState {
    borrow(book: Book): void;
    returnBook(book: Book): void;
    reportLost(book: Book): void;
    sendToMaintenance(book: Book): void;
}

export class AvailableState implements BookState {
    borrow(book: Book): void {
        book.setState(new LoanedState());
    }
    returnBook(book: Book): void {
        throw new Error("Livro já está disponível.");
    }
    reportLost(book: Book): void {
        book.setState(new LostState());
    }
    sendToMaintenance(book: Book): void {
        book.setState(new MaintenanceState());
    }
}

export class LoanedState implements BookState {
    borrow(book: Book): void {
        throw new Error("Livro já está emprestado.");
    }
    returnBook(book: Book): void {
        book.setState(new AvailableState());
    }
    reportLost(book: Book): void {
        book.setState(new LostState());
    }
    sendToMaintenance(book: Book): void {
        throw new Error("Livro emprestado não pode ir para manutenção.");
    }
}

export class OverdueState implements BookState {
    borrow(book: Book): void {
        throw new Error("Livro está atrasado e não pode ser emprestado.");
    }
    returnBook(book: Book): void {
        book.setState(new AvailableState());
    }
    reportLost(book: Book): void {
        book.setState(new LostState());
    }
    sendToMaintenance(book: Book): void {
        throw new Error("Livro atrasado não pode ir para manutenção.");
    }
}

export class LostState implements BookState {
    borrow(book: Book): void {
        throw new Error("Livro perdido.");
    }
    returnBook(book: Book): void {
        // Se foi encontrado e devolvido
        book.setState(new AvailableState());
    }
    reportLost(book: Book): void {
        throw new Error("Livro já está perdido.");
    }
    sendToMaintenance(book: Book): void {
        throw new Error("Livro perdido.");
    }
}

export class MaintenanceState implements BookState {
    borrow(book: Book): void {
        throw new Error("Livro em manutenção.");
    }
    returnBook(book: Book): void {
        book.setState(new AvailableState()); // Volta da manutenção
    }
    reportLost(book: Book): void {
        book.setState(new LostState());
    }
    sendToMaintenance(book: Book): void {
        throw new Error("Livro já está em manutenção.");
    }
}

export class Book {
    private state: BookState;

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly isbn: string,
        initialState: BookState = new AvailableState()
    ) {
        this.state = initialState;
    }

    setState(state: BookState): void {
        this.state = state;
    }

    getState(): BookState {
        return this.state;
    }

    borrow(): void {
        this.state.borrow(this);
    }

    returnBook(): void {
        this.state.returnBook(this);
    }

    reportLost(): void {
        this.state.reportLost(this);
    }

    sendToMaintenance(): void {
        this.state.sendToMaintenance(this);
    }
}
