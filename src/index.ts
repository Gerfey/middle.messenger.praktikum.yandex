import './scss/index.scss';

import {AuthorizationPage} from "./pages/Authorization";
import {RegistrationPage} from "./pages/Registration";
import {ProfilePage} from "./pages/Profile";
import {ProfileChangePage} from "./pages/Profile/Change";
import {Error404Page} from "./pages/Error/404";
import {Error500Page} from "./pages/Error/500";
import {ChatPage} from "./pages/Chat";

import {registerComponent} from "./utils/registerComponent";
import {Button} from "./components/Button";
import {ProfileItems} from "./components/Profile/Item";
import {ProfileChangePasswordPage} from "./pages/Profile/ChangePassword";

registerComponent('Button', Button as any);
registerComponent('ProfileItems', ProfileItems as any);

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');

    const path = window.location.pathname;

    let homePage;
    switch (path) {
        case "/":
        case "/authorization":
            homePage = new AuthorizationPage();
            break;
        case "/profile":
            homePage = new ProfilePage();
            break;
        case "/profile/change":
            homePage = new ProfileChangePage();
            break;
        case "/profile/change/password":
            homePage = new ProfileChangePasswordPage();
            break;
        case "/registration":
            homePage = new RegistrationPage();
            break;
        case "/chats":
            homePage = new ChatPage();
            break;
        case "/404":
            homePage = new Error404Page();
            break;
        case "/500":
            homePage = new Error500Page();
            break;
        default:
            homePage = new Error404Page();
            break;
    }

    // @ts-ignore
    root.append(homePage.getContent());
});