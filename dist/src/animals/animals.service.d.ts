import { Result, User, Prisma } from '@prisma/client';
import { PrismaService } from "prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdateUser(data: {
        id: number;
        name: string;
        summ: number;
    }): Promise<User>;
    createResultAndAddToUser(params: {
        userId: number;
        resultData: {
            name: string;
            summ: number;
            time: number;
        };
    }): Promise<Result>;
    getUsers(): Promise<User[]>;
    getResults(id: number): Promise<Result[]>;
    getResultsID(userId: number): Promise<Result[]>;
    deleteResult(where: Prisma.ResultWhereUniqueInput): Promise<Result>;
    updateResult(params: {
        where: Prisma.ResultWhereUniqueInput;
        data: Prisma.ResultUpdateInput;
    }): Promise<Result>;
}
