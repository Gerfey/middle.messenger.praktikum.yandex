import BaseAPI from './BaseAPI';

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
    unread_count: number;
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            display_name: string,
            login: string,
            avatar: string,
            email: string,
            phone: string,
        },
        time: string,
        content: string,
        id: number,
    };
}

export interface ChatsData {
    offset?: number;
    limit?: number;
    title?: string;
}

export interface CreateChat {
    title: string;
}

export interface UserInChat {
    login: string;
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    read(): Promise<ChatInfo> {
        return this.http.get('/');
    }

    create(data: CreateChat) {
        return this.http.post('/', {
            withCredentials: true,
            data: data,
        });
    }

    addUser(data) {
        return this.http.put('/users', {
            withCredentials: true,
            data: data,
        });
    }

    deleteUser(data) {
        return this.http.delete('/users', {
            withCredentials: true,
            data: data,
        });
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);

        return response.token;
    }

    update = undefined;
    delete = undefined;
}

export default new ChatsAPI();
