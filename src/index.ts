import './scss/index.scss';

import {components} from './components';

import {registerComponent} from './utils/registerComponent';

import Components from './utils/Components';
import {AuthorizationPage} from './pages/Authorization/authorizationPage';
import {ChatPage} from './pages/Chat/chatPage';
import {Error404Page} from './pages/Error/404/error404Page';
import {Error500Page} from './pages/Error/500/error500Page';
import {ProfilePage} from './pages/Profile/profilePage';
import {ProfileChangePasswordPage} from './pages/Profile/ChangePassword/profileChangePasswordPage';
import {ProfileChangePage} from './pages/Profile/Change/profileChangePage';
import {RegistrationPage} from './pages/Registration/registrationPage';
import Router from './utils/Router';

window.addEventListener('DOMContentLoaded', () => {
    components.forEach((component: Components) => {
        registerComponent(component.componentName, component);
    });

    const router = new Router();

    router
        .use('/', AuthorizationPage)
        .use('/sign-up', RegistrationPage)
        .use('/messenger', ChatPage)
        .use('/settings', ProfilePage)
        .use('/settings/change', ProfileChangePage)
        .use('/settings/change/password', ProfileChangePasswordPage)
        .use('/500', Error500Page)
        .use('/404', Error404Page);

    router.start();
});
