import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export class UserController {
    constructor(private service: UserService) {}

    getAll = (req: Request, res: Response) => {
    return res.json(this.service.getAllUsers());
    };

    getOne = (req: Request, res: Response) => {
    const user = this.service.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
    };

    create = (req: Request, res: Response) => {
    const parse = CreateUserDto.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: parse.error.flatten() });
    }

    const result = this.service.createUser(parse.data);
    if (result instanceof Error) {
        return res.status(409).json({ error: result.message });
    }

    return res.status(201).json(result);
    };

    update = (req: Request, res: Response) => {
    const parse = UpdateUserDto.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: parse.error.flatten() });
    }

    const result = this.service.updateUser(req.params.id, parse.data);
    if (result instanceof Error) {
        if (result.message === "User not found") {
        return res.status(404).json({ error: result.message });
        }
        return res.status(409).json({ error: result.message });
    }

    return res.json(result);
    };

    delete = (req: Request, res: Response) => {
    const result = this.service.deleteUser(req.params.id);

    if (result instanceof Error) {
    return res.status(404).json({ error: result.message });
    }

    return res.status(204).send();
    };
}
