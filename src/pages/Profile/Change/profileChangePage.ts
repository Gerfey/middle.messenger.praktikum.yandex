import Components from '../../../utils/Components';
import template from './profile.hbs';
import {withStore} from '../../../utils/Store';
import ProfileController from '../../../controllers/ProfileController';
import ProfileItems from '../../../components/Profile/Item';
import AuthController from '../../../controllers/AuthController';

export class ProfileChangePageBase extends Components {
    constructor() {
        super({
            onSubmit: () => {
                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof ProfileItems)
                    .map((child) => ([(child as ProfileItems).getName(), (child as ProfileItems).getValue()]));

                const data = Object.fromEntries(values);

                ProfileController.changeUserData(data);
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

export const ProfileChangePage = withUser(ProfileChangePageBase);
