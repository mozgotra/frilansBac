import { Controller, Get,Post,Body,Delete,Put,Param } from "@nestjs/common";
import { UserService} from "./animals.service";
import {Result,User} from '@prisma/client'
// import {CatPostService} from './post.service';
@Controller('user')
export class  UsersController {
    constructor (private readonly  userService:UserService,
       
    ){}
 @Post()
//  async createUser(
//     @Body() data: {id: number; results: {name: string; summ: number; time: number; }[];},
//  ): Promise<User>{
//     return this.userService.createUser(data)
//  }
async createOrUpdateUser (@Body() data: { id: number; name: string; summ: number; }): Promise<User> {
    return this.userService.createOrUpdateUser (data);
}
 @Get()
 async getUser():Promise<User[]>{
    return this.userService.getUsers()
 }
 @Get('results/results/:id')
 async getResults(@Param('id') id: number): Promise<Result[]> {
   return this.userService.getResults(id);
}
 @Get('results/:userId')
    async getResultsID(@Param('userId') userId: number): Promise<Result[]> {
        return this.userService.getResultsID(userId);
    }
    // async deleteResult(@Param('id') id: number): Promise<Result> {
    //     return this.userService.deleteResult({ id: Number(id) });
    // }

    // @Post('result')
    // async createResultAndAddToUser (
    //     @Body() params: {
    //         userId: number;
    //         resultData: { name: string; summ: number; time: number; };
    //     }
    // ): Promise<Result> {
    //     const newResult = await this.userService.createResultAndAddToUser(params);
    //    // return this.userService.createResultAndAddToUser(params);
    //    return newResult;
    // }

    // async createResultAndAddToUser (params: {
    //     userId: number;
    //     resultData: { name: string; summ: number; time: number; };
    // }): Promise<Result> {
    //     // Создание нового результата
    //     const newResult = await this.prisma.result.create({
    //         data: {
    //             ...params.resultData,
    //             userId: params.userId, // Указываем ID пользователя
    //         },
    //     });

    //     // Возвращаем созданный результат
    //     return newResult;
    // }
    
    @Delete('result/:id')
    async deleteResult(@Param('id') id: number): Promise<Result> {
        return this.userService.deleteResult({ id: Number(id) });
    }

    @Put('updateresult/:id')
    async updateResult(
       @Param('id') id: string,
       @Body() updateData: { time: number; summ: number }, // Обновлено: теперь summ тоже в теле запроса
    ): Promise<Result> {
       return this.userService.updateResult({
           where: { id: Number(id) },
           data: updateData, // Используйте пустой объект, если у вас нет дополнительных данных для обновления
          
       });
    }
   }







// @Controller('dogs')
// export class DogsController {
//     constructor (private readonly dogsService:DogService){}
//  @Post()
//  async createDog(
//     @Body() data: {name:string; age:number; breed:string},
//  ): Promise<Dog>{
//     return this.dogsService.createDog(data)
//  }
//  @Get()
//  async getDog():Promise<Dog[]>{
//     return this.dogsService.getDog() }
//     @Delete('dog/:id')
//   async deleteDog(@Param('id') id: number): Promise<Dog> {
//     return this.dogsService.deleteDog({ id: Number(id) });
//   }
//   @Put('dog/:id')
//   async updateParrot(
//    @Param('id') id: string,
//    @Body() updateData: { name: string; age: number; breed: string },
// ): Promise<Cat> {
//    return this.dogsService.updateDog({
//        where: { id: Number(id) },
//        data: updateData,
//    });
// }
// }


