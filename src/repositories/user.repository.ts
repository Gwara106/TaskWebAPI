import { User } from "../types/user.types";

export class UserRepository {
    private users: User[] = [
        {id:"1", username:"Ghanshyam", email:"ghanasta@email.com", name:"Ghanshyam Tiwari", age:21},
        {id:"2", username:"Jaswindar", email:"jaswindar@email.com", name:"Jaswindar Singh", age:20},
    ];

    findAll(): User[] {
        return this.users;
    }
    
    findById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    findByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    update(id: string, updated: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...updated };
    return this.users[index];
    }

    delete(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
    }
}