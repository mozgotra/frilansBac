import { UserService } from "./animals.service";
import { Result, User } from '@prisma/client';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    createOrUpdateUser(data: {
        id: number;
        name: string;
        summ: number;
    }): Promise<User>;
    getUser(): Promise<User[]>;
    getResults(id: number): Promise<Result[]>;
    getResultsID(userId: number): Promise<Result[]>;
    deleteResult(id: number): Promise<Result>;
    updateResult(id: string, updateData: {
        time: number;
        summ: number;
    }): Promise<Result>;
}
