import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import {UserDTO} from '../dto';
import {v4 as uuid} from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {FileStore} from "../store/file-store";

const ICONS_DIR = path.join(process.cwd(), 'public/icons');
const DEFAULT_ICON = path.join(process.cwd(), 'public/icons/default.png');

@Injectable()
export class UsersService {
    constructor(private readonly store: FileStore) {
    }

    public createUser(name: string, icon?: Express.Multer.File): UserDTO {
        if (!name) throw new BadRequestException('Name is required');
        if (this.store.findUserByName(name)) {
            throw new BadRequestException('User with this name already exists');
        }

        if (!fs.existsSync(ICONS_DIR)) {
            fs.mkdirSync(ICONS_DIR, {recursive: true});
        }

        const id = uuid();
        const createdAt = new Date().toISOString();
        const iconPath = path.join(ICONS_DIR, `${id}.png`);
        if (icon) {
            fs.renameSync(icon.path, iconPath);
        } else {
            fs.copyFileSync(DEFAULT_ICON, iconPath);
        }

        const user: UserDTO = {
            id,
            name,
            iconUrl: `/api/users/${id}/icon`,
            createdAt,
        };

        return this.store.addUser(user);
    }

    public getUsers(): UserDTO[] {
        return this.store.getUsers();
    }

    public getIconPath(userId: string): string {
        const filePath = path.join(ICONS_DIR, `${userId}.png`);
        return fs.existsSync(filePath) ? filePath : DEFAULT_ICON;
    }

    public getUserById(id: string): UserDTO {
        const user = this.store.findUserById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
