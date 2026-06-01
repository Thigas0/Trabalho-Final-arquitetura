import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, UserRole } from '../../domain/User';
import { getDbConnection } from '../database/database';

export class SqliteUserRepository implements UserRepository {
    async findById(id: string): Promise<User | null> {
        const db = await getDbConnection();
        const row = await db.get('SELECT * FROM users WHERE id = ?', id);
        
        if (!row) return null;

        return new User(row.id, row.name, row.email, row.role as UserRole);
    }

    async save(user: User): Promise<void> {
        const db = await getDbConnection();
        await db.run(
            `INSERT INTO users (id, name, email, role) 
             VALUES (?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET 
             name = excluded.name, 
             email = excluded.email, 
             role = excluded.role`,
            [user.id, user.name, user.email, user.role]
        );
    }
}
