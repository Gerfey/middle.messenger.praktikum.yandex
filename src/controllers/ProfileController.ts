import router from '../utils/Router';
import API, {
    ChangeProfileAvatar,
    ChangeProfileData,
    ChangeProfilePassword,
    FindUsers,
    ProfileAPI
} from '../api/ProfileAPI';
import AuthController from './AuthController';

export class ProfileController {
    private readonly api: ProfileAPI;

    constructor() {
        this.api = API;
    }

    async changeUserData(data: ChangeProfileData) {
        try {
            await this.api.changeProfileData(data);

            await AuthController.fetchUser();

            router.go('/settings');
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeUserPassword(data: ChangeProfilePassword) {
        try {
            await this.api.changeProfilePassword(data);

            await AuthController.fetchUser();

            router.go('/settings');
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeUserAvatar(data: ChangeProfileAvatar) {
        try {
            await this.api.changeProfileAvatar(data);

            await AuthController.fetchUser();

            router.go('/settings');
        } catch (e: any) {
            console.error(e);
        }
    }

    async findUsers(data: FindUsers) {
        return this.api.findUsers(data);
    }
}

export default new ProfileController();
