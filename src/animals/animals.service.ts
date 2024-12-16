import { Injectable } from "@nestjs/common";
import {Result,User,Prisma, PrismaClient  } from '@prisma/client'
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService) {}
    async createOrUpdateUser (data: { id: number; name: string; summ: number; }): Promise<User> {
        const { id, name, summ } = data;
        // Проверяем, существует ли пользователь
        let user = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            // Если пользователь не существует, создаем нового
            user = await this.prisma.user.create({
                data: {
                    id: id,
                },
            });
        }

        // Создаем новый результат и добавляем его к пользователю
        await this.createResultAndAddToUser ({
            userId: user.id,
            resultData: { name, summ, time: 0 }, // Устанавливаем time по умолчанию
        });

        return user;
    }

    async createResultAndAddToUser (params: {
        userId: number;
        resultData: { name: string; summ: number; time: number; };
    }): Promise<Result> {
        // Создание нового результата
        const newResult = await this.prisma.result.create({
            data: {
                ...params.resultData,
                userId: params.userId, // Указываем ID пользователя
            },
        });

        // Возвращаем созданный результат
        return newResult;
    }

    async getUsers(): Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async getResults(id: number): Promise<Result[]> {
        const resultId = await this.prisma.result.findMany({
            where: { id: Number(id) },
        }).catch((error) => {
            if (error.code === 'P2025') { // Код ошибки, если запись не найдена
                throw new Error('Cat not found');
            }
            throw error; // Перебрасываем остальные ошибки
        });
      
        return resultId;
      }
    async getResultsID(userId: number): Promise<Result[]> {
        const results = await this.prisma.result.findMany({
            where: { userId: Number(userId) },
        }).catch((error) => {
            // Обработка ошибок, если необходимо
            throw error; // Перебрасываем остальные ошибки
        });
        return results;
    }


    async deleteResult(where: Prisma.ResultWhereUniqueInput): Promise<Result> {
      const resultId = Number(where.id);
      const deletedResult = await this.prisma.result.delete({
          where: {
              id: resultId,
          },
      }).catch((error) => {
          if (error.code === 'P2025') { // Код ошибки, если запись не найдена
              throw new Error('Cat not found');
          }
          throw error; // Перебрасываем остальные ошибки
      });
    
      return deletedResult;
    }

    async updateResult(params: {
        where: Prisma.ResultWhereUniqueInput;
        data: Prisma.ResultUpdateInput;
    }): Promise<Result> {
        const { where, data} = params;
        return this.prisma.result.update({
            where,
            data
        });
    }
    

}
