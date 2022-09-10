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

components.forEach((component: Components) => {
    registerComponent(component.componentName, component);
});

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');

    const path = window.location.pathname;

    let homePage;
    switch (path) {
        case '/':
        case '/authorization':
            homePage = new AuthorizationPage();
            break;
        case '/profile':
            homePage = new ProfilePage();
            break;
        case '/profile/change':
            homePage = new ProfileChangePage();
            break;
        case '/profile/change/password':
            homePage = new ProfileChangePasswordPage();
            break;
        case '/registration':
            homePage = new RegistrationPage();
            break;
        case '/chats':
            homePage = new ChatPage();
            break;
        case '/500':
            homePage = new Error500Page();
            break;
        default:
            homePage = new Error404Page();
            break;
    }

    root.append(homePage.getContent());
});
