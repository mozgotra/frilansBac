import { Module } from "@nestjs/common";
import { UserService} from "./animals.service";
import { UsersController} from "./animals.controller";
import { PrismaModule } from './../../prisma/prisma.module';
// import { CatPostService } from "./post.service";

@Module({
    providers:[UserService],
    controllers:[UsersController],
    imports:[PrismaModule],
})
// @Module({
//     providers:[ResultService],
//     controllers:[CatsController],
//     imports:[PrismaModule],
// })
// export class ResultsModule{}
export class UsersModule{}