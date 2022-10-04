import Components from '../../utils/Components';
import template from './chat.hbs';
import './chat.scss';
import {withStore} from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import FormItem from '../../components/FormItem';
import MessagesController from '../../controllers/MessagesController';

export default class ChatPageBase extends Components {
    constructor() {
        super({
            sendMessage: () => {
                const input = document.querySelector('.message-block__input');
                const message = input.value;

                MessagesController.sendMessage(1294, message);
            },
            clickCreateChat: (e: PointerEvent) => {
                e.preventDefault();
                console.log('chat-create');

                const overlay = document.querySelector('#overlay-modal');
                const modalElem = document.querySelector('.modal[data-modal="chats_create"]');

                modalElem.classList.add('active');
                overlay.classList.add('active');

                overlay.addEventListener('click', (e) => {
                    modalElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
            },
            sendCreateUser: () => {
                console.log('create user');

                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .filter(child => child.element?.className.match('chats_user_create'))
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                console.log(values);

                const data = Object.fromEntries(values);

                console.log(data);

                ChatsController.addUserInChat(data);
            },
            sendDeleteUser: () => {
                console.log('delete user');

                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .filter(child => child.element?.className.match('chats_user_remove'))
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                console.log(values);

                const data = Object.fromEntries(values);

                console.log(data);

                ChatsController.removeUserInChat(data);
            },
            sendCreateChat: () => {
                console.log('create chat');

                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .filter(child => child.element?.className.match('chats_create'))
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                console.log(values);

                const data = Object.fromEntries(values);

                console.log(data);

                ChatsController.createChat(data);
            },
        });
    }

    init() {
        ChatsController.fetchChats();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withChatPage = withStore((state) => (state));

export const ChatPage = withChatPage(ChatPageBase);
