import express, { Request, Response } from 'express';
import { getDbConnection } from '../infrastructure/database/database';
import { SqliteBookRepository } from '../infrastructure/repositories/SqliteBookRepository';
import { SqliteUserRepository } from '../infrastructure/repositories/SqliteUserRepository';
import { SqliteLoanRepository } from '../infrastructure/repositories/SqliteLoanRepository';
import { BorrowBookUseCase } from '../application/use-cases/BorrowBookUseCase';
import { ReturnBookUseCase } from '../application/use-cases/ReturnBookUseCase';
import { DomainEventPublisher } from '../domain/Observer';
import { BookReturnedEvent } from '../application/events/BookReturnedEvent';
import { NotifyNextInLineListener } from '../application/listeners/NotifyNextInLineListener';
import { Book } from '../domain/Book';
import { User } from '../domain/User';

const app = express();
app.use(express.json());

// Setup Dependências
const bookRepo = new SqliteBookRepository();
const userRepo = new SqliteUserRepository();
const loanRepo = new SqliteLoanRepository();

const eventPublisher = new DomainEventPublisher<BookReturnedEvent>();
eventPublisher.attach(new NotifyNextInLineListener());

const borrowBookUseCase = new BorrowBookUseCase(bookRepo, userRepo, loanRepo);
const returnBookUseCase = new ReturnBookUseCase(loanRepo, bookRepo, eventPublisher);

// Rota Raiz (Apenas para não dar "Cannot GET /" no navegador)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        api: 'OpenBiblio API',
        status: 'online',
        endpoints: ['POST /seed', 'POST /loans', 'POST /returns']
    });
});

// Endpoint de Empréstimo
app.post('/loans', async (req: Request, res: Response) => {
    try {
        const { userId, bookId } = req.body;
        const loan = await borrowBookUseCase.execute(userId, bookId);
        res.status(201).json({
            message: 'Empréstimo realizado com sucesso.',
            loanId: loan.id,
            dueDate: loan.dueDate
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint de Devolução
app.post('/returns', async (req: Request, res: Response) => {
    try {
        const { loanId } = req.body;
        await returnBookUseCase.execute(loanId);
        res.status(200).json({
            message: 'Devolução realizada com sucesso.'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Seeds para facilitar o teste local
app.post('/seed', async (req: Request, res: Response) => {
    try {
        const user = new User("user1", "Thiago", "thiago@email.com", "Student");
        await userRepo.save(user);

        const book = new Book("book1", "Clean Architecture", "Robert C. Martin", "123456");
        await bookRepo.save(book);

        res.status(201).json({ message: 'Seed concluído com sucesso. (userId: user1, bookId: book1)' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

getDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar no banco de dados:', err);
});
