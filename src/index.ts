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
import router from './utils/Router';
import AuthController from './controllers/AuthController';

window.addEventListener('DOMContentLoaded', () => {
    components.forEach((component: Components) => {
        registerComponent(component.componentName, component);
    });

    router
        .use('/', AuthorizationPage)
        .use('/sign-up', RegistrationPage)
        .use('/messenger', ChatPage)
        .use('/settings', ProfilePage)
        .use('/settings/change', ProfileChangePage)
        .use('/settings/change/password', ProfileChangePasswordPage)
        .use('/500', Error500Page)
        .use('/404', Error404Page);

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case '/':
        case '/sign-up':
            isProtectedRoute = false;
            break;
    }

    try {
        AuthController.fetchUser();

        router.start();

        if (!isProtectedRoute) {
            router.go('/messenger');
        }
    } catch (e) {
        router.start();

        if (isProtectedRoute) {
            router.go('/');
        }
    }
});
