import API, {ChatsData, ChatsAPI, CreateChat} from "../api/ChatsAPI";
import store from "../utils/Store";
import ProfileController from "./ProfileController";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async getChats() {
        try {
            await this.fetchChats();

        } catch (e: any) {
            console.error(e);
        }
    }

    async createChat(data: CreateChat) {
        await this.api.create(data);

        await this.fetchChats();
    }

    async addUserInChat(data) {
        await this.api.addUser(data);

        await this.fetchChats();
    }

    async removeUserInChat(data) {
        await this.api.deleteUser(data);

        await this.fetchChats();
    }

    async fetchChats() {
        const chats = await this.api.read();

        store.set('chats', chats);
    }
}

export default new ChatsController();
