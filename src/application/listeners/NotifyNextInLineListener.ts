import { Observer } from '../../domain/Observer';
import { BookReturnedEvent } from '../events/BookReturnedEvent';

export class NotifyNextInLineListener implements Observer<BookReturnedEvent> {
    update(event: BookReturnedEvent): void {
        const book = event.book;
        // Simulando a lógica de negócio: verificaria no banco de dados se há reservas para o livro.
        // Como o foco é o padrão Observer e a prova de conceito, faremos um mock de log.
        console.log(`[Observer] Evento recebido! Livro "${book.title}" devolvido em ${event.returnedAt.toISOString()}.`);
        console.log(`[E-mail Mock] Enviando e-mail para o próximo da fila informando que o livro "${book.title}" está disponível.`);
    }
}
