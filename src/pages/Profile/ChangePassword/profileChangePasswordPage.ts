import Components from '../../../utils/Components';
import template from './profile.hbs';
import AuthController from '../../../controllers/AuthController';
import ProfileItems from '../../../components/Profile/Item';
import ProfileController from '../../../controllers/ProfileController';
import {withStore} from "../../../utils/Store";

export class ProfileChangePasswordPageBase extends Components {
    constructor() {
        super({
            onSubmit: () => {
                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof ProfileItems)
                    .map((child) => ([(child as ProfileItems).getName(), (child as ProfileItems).getValue()]));

                const data = Object.fromEntries(values);

                if (data.newPassword === data.newRepeadPassword) {
                    ProfileController.changeUserPassword(data);
                }
            },
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

export const ProfileChangePasswordPage = withUser(ProfileChangePasswordPageBase);
