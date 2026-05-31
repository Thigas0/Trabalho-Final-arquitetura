import { Book } from '../../domain/Book';

export class BookReturnedEvent {
    constructor(
        public readonly book: Book,
        public readonly returnedAt: Date
    ) {}
}
