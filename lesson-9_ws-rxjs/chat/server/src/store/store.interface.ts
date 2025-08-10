import {ChatDTO, MessageDTO, UserDTO} from "../dto";

export interface IStore {
    // Users
    getUsers(): UserDTO[];
    addUser(user: UserDTO): UserDTO;
    findUserByName(name: string): UserDTO | undefined;
    findUserById(id: string): UserDTO | undefined;

    // Chats
    getChats(): ChatDTO[];
    addChat(chat: ChatDTO): ChatDTO;
    findChatById(id: string): ChatDTO | undefined;
    updateChat(id: string, data: Partial<ChatDTO>): ChatDTO | undefined;

    // Messages
    getMessages(chatId: string): MessageDTO[];
    addMessage(chatId: string, message: MessageDTO): MessageDTO;
}
