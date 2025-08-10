import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    ForbiddenException
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Response} from 'express';
import {UserDTO} from "../dto";
import {UsersService} from "./user.service";

@Controller('/api/users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('icon'))
    createUser(
        @Body('name') name: string,
        @UploadedFile() icon?: Express.Multer.File,
    ): UserDTO {
        throw new ForbiddenException('Not implemented yet');
    }

    @Get()
    list(): { items: UserDTO[]; total: number } {
        const users = this.userService.getUsers();
        return {
            items: users,
            total: users.length
        }
    }

    @Get('icons/:iconPath')
    async icon(@Param('iconPath') iconPath: string, @Res() res: Response) {
        throw new ForbiddenException('Not implemented yet');
    }
}
