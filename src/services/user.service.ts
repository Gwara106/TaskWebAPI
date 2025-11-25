import { CreateUserDtoType, UpdateUserDtoType } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.types";

export class UserService {
    constructor(private repo: UserRepository) {}

    getAllUsers() {
        return this.repo.findAll();
    }

    getUserById(id: string): User | undefined {
    return this.repo.findById(id);
    }

    createUser(dto: CreateUserDtoType): User | Error {
    if (this.repo.findById(dto.id)) {
        return new Error("User ID already exists");
    }
    if (this.repo.findByEmail(dto.email)) {
        return new Error("Email already exists");
    }
    if (this.repo.findByUsername(dto.username)) {
        return new Error("Username already exists");
    }

    return this.repo.create(dto);
    }

    updateUser(id: string, dto: UpdateUserDtoType): User | Error {
    const existing = this.repo.findById(id);
    if (!existing) {
    return new Error("User not found");
    }

    const byEmail = this.repo.findByEmail(dto.email);
    if (byEmail && byEmail.id !== id) {
    return new Error("Email already exists");
    }

    const byUsername = this.repo.findByUsername(dto.username);
    if (byUsername && byUsername.id !== id) {
    return new Error("Username already exists");
    }

    return this.repo.update(id, dto)!;
    }

    deleteUser(id: string): boolean | Error {
    if (!this.repo.findById(id)) {
    return new Error("User not found");
    }
    return this.repo.delete(id);
    }
}