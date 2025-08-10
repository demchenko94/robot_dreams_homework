import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {FileStore} from "../store/file-store";
import {UsersService} from "./user.service";

@Module({
  controllers: [UsersController],
  providers: [FileStore, UsersService],
  exports: [FileStore],
})
export class UsersModule {}
