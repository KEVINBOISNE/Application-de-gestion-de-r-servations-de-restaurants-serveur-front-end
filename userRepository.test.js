import { describe, it, expect } from 'vitest';
import { createUser, getUserById, deleteUser } from './userRepository';

describe('User Repository', () => {
    it('should create a new user', async () => {
        await createUser('Test', 'User', 'password123', '1 rue de la paix', 'test.user@example.com', '1234567890123456');
        const user = await getUserById(1);
        expect(user).toBeDefined();
        expect(user.nom).toBe('Test');
        expect(user.prenom).toBe('User');
        expect(user.email).toBe('test.user@example.com');
    });

    it('should delete a user', async () => {
        await createUser('Delete', 'User', 'password123', '2 rue de la paix', 'delete.user@example.com', '1234567890123456');
        const user = await getUserById(2);
        expect(user).toBeDefined();
        await deleteUser(2);
        const deletedUser = await getUserById(2);
        expect(deletedUser).toBeUndefined();
    });
});