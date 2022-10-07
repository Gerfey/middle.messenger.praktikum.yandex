import API, {ChatsAPI, CreateChat} from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import ProfileController from "./ProfileController";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async createChat(data: CreateChat) {
        await this.api.create(data);
    }

    async addUserInChat(data, selectedChatId) {
        const findUser = await ProfileController.findUsers(data);

        await this.api.addUser({
            users: [
                findUser[0]?.id
            ],
            chatId: selectedChatId
        });
    }

    async removeUserInChat(data) {
        await this.api.deleteUser(data);
    }

    async fetchChats() {
        const chats = await this.api.read();

        chats.map(async (chat) => {
            const token = await this.getToken(chat.id);

            await MessagesController.connect(chat.id, token);
        });

        store.set('chats', chats);
    }

    selectedChatId(chatId: number) {
        store.set('selectedChatId', chatId);
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }
}

export default new ChatsController();
