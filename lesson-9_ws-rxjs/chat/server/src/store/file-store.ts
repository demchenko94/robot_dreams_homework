import {Injectable, OnModuleInit} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {ChatDTO, MessageDTO, UserDTO} from '../dto';
import {IStore} from "./store.interface";

const USERS_PATH = path.join(process.cwd(), 'data/users.json');
const CHATS_PATH = path.join(process.cwd(), 'data/chats.json');
const MESSAGES_PATH = path.join(process.cwd(), 'data/messagesByChat.json');

@Injectable()
export class FileStore implements IStore, OnModuleInit {
    private users: UserDTO[] = [];
    private chats: ChatDTO[] = [];
    private messagesByChat: Record<string, MessageDTO[]> = {};

    onModuleInit() {
        this.load();
    }

    private load() {
        if (!fs.existsSync(path.dirname(USERS_PATH))) {
            fs.mkdirSync(path.dirname(USERS_PATH), {recursive: true});
        }
        if (!fs.existsSync(USERS_PATH)) fs.writeFileSync(USERS_PATH, '[]');
        if (!fs.existsSync(CHATS_PATH)) fs.writeFileSync(CHATS_PATH, '[]');
        if (!fs.existsSync(MESSAGES_PATH)) fs.writeFileSync(MESSAGES_PATH, '{}');

        this.users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
        this.chats = JSON.parse(fs.readFileSync(CHATS_PATH, 'utf8'));
        this.messagesByChat = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
    }

    private saveUsers() {
        fs.writeFileSync(USERS_PATH, JSON.stringify(this.users, null, 2));
    }

    private saveChats() {
        fs.writeFileSync(CHATS_PATH, JSON.stringify(this.chats, null, 2));
    }

    private saveMessages() {
        fs.writeFileSync(MESSAGES_PATH, JSON.stringify(this.messagesByChat, null, 2));
    }


    public getUsers(): UserDTO[] {
        return this.users;
    }

    public addUser(user: UserDTO): UserDTO {
        this.users.push(user);
        this.saveUsers();
        return user;
    }

    public findUserByName(name: string): UserDTO | undefined {
        return this.users.find(u => u.name === name);
    }

    public findUserById(id: string): UserDTO | undefined {
        return this.users.find(u => u.id === id);
    }


    public getChats(): ChatDTO[] {
        return this.chats;
    }

    public addChat(chat: ChatDTO): ChatDTO {
        this.chats.push(chat);
        this.saveChats();
        return chat;
    }

    public findChatById(id: string): ChatDTO | undefined {
        return this.chats.find(c => c.id === id);
    }

    public updateChat(id: string, data: Partial<ChatDTO>): ChatDTO | undefined {
        const chat = this.findChatById(id);
        if (!chat) return undefined;
        Object.assign(chat, data);
        this.saveChats();
        return chat;
    }

    public getMessages(chatId: string): MessageDTO[] {
        return this.messagesByChat[chatId] || [];
    }

    public addMessage(chatId: string, message: MessageDTO): MessageDTO {
        if (!this.messagesByChat[chatId]) {
            this.messagesByChat[chatId] = [];
        }
        this.messagesByChat[chatId].push(message);
        this.saveMessages();
        return message;
    }
}
