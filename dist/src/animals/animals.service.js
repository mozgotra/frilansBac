"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdateUser(data) {
        const { id, name, summ } = data;
        let user = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    id: id,
                },
            });
        }
        await this.createResultAndAddToUser({
            userId: user.id,
            resultData: { name, summ, time: 0 },
        });
        return user;
    }
    async createResultAndAddToUser(params) {
        const newResult = await this.prisma.result.create({
            data: {
                ...params.resultData,
                userId: params.userId,
            },
        });
        return newResult;
    }
    async getUsers() {
        return this.prisma.user.findMany();
    }
    async getResults(id) {
        const resultId = await this.prisma.result.findMany({
            where: { id: Number(id) },
        }).catch((error) => {
            if (error.code === 'P2025') {
                throw new Error('Cat not found');
            }
            throw error;
        });
        return resultId;
    }
    async getResultsID(userId) {
        const results = await this.prisma.result.findMany({
            where: { userId: Number(userId) },
        }).catch((error) => {
            throw error;
        });
        return results;
    }
    async deleteResult(where) {
        const resultId = Number(where.id);
        const deletedResult = await this.prisma.result.delete({
            where: {
                id: resultId,
            },
        }).catch((error) => {
            if (error.code === 'P2025') {
                throw new Error('Cat not found');
            }
            throw error;
        });
        return deletedResult;
    }
    async updateResult(params) {
        const { where, data } = params;
        return this.prisma.result.update({
            where,
            data
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=animals.service.js.map