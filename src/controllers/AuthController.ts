import API, {AuthAPI, SignInData, SignUpData} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SignInData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();

            router.go('/messenger');
        } catch (e: any) {
            console.error(e);
        }
    }

    async signup(data: SignUpData) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            router.go('/messenger');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.read();

            store.set('user', user);

            switch (window.location.pathname) {
                case '/':
                case '/sign-up':
                    router.go('/messenger');
                    break;
            }
        } catch (e: any) {
            router.go('/');
        }
    }

    async logout() {
        try {
            await this.api.logout();

            router.go('/');
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();
