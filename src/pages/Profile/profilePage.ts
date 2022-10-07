import Components from '../../utils/Components';
import template from './profile.hbs';
import './profile.scss';
import AuthController from '../../controllers/AuthController';
import {withStore} from '../../utils/Store';
import ProfileImage from '../../components/ImageProfile';
import ProfileController from '../../controllers/ProfileController';

export default class ProfilePageBase extends Components {
    constructor() {
        super({
            onExit: () => {
                AuthController.logout();
            },
            clickByImage: () => {
                const imageInputs = Object
                    .values(this.children)
                    .filter(child => child instanceof ProfileImage);

                const imageInput = imageInputs[0];

                imageInput.getInput().click();
            },
            onChange: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const files = input.files;

                if (files) {
                    const formData = new FormData();
                    formData.append('avatar', files[0]);

                    ProfileController.changeUserAvatar(formData);
                }
            }
        });
    }

    init() {
        AuthController.fetchUser();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({...state.user}));

export const ProfilePage = withUser(ProfilePageBase);
