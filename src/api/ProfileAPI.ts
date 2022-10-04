import BaseAPI from './BaseAPI';

export interface ChangeProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ChangeProfilePassword {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeProfileAvatar {
    avatar: any;
}

export interface FindUsers {
    users: any;
    chatId: any;
}

export class ProfileAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfileData(data: ChangeProfileData) {
        return this.http.put('/profile', {
            withCredentials: true,
            data: data,
        });
    }

    changeProfilePassword(data: ChangeProfilePassword) {
        return this.http.put('/password', {
            withCredentials: true,
            data: data,
        });
    }

    changeProfileAvatar(data: ChangeProfileAvatar) {
        return this.http.put('/profile/avatar', {
            withCredentials: true,
            data: data,
        });
    }

    findUsers(data) {
        return this.http.post('/search', {
            withCredentials: true,
            data: data,
        });
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new ProfileAPI();
