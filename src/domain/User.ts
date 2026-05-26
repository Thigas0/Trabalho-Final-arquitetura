export type UserRole = 'Student' | 'Teacher' | 'Visitor';

export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly role: UserRole
    ) {}
}
