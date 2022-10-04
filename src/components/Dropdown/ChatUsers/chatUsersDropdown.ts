import template from './chatUsersDropdown.hbs';
import Components from '../../../utils/Components';
import './style.scss';

interface ChatUsersDropdownProps {

}

export class ChatUsersDropdown extends Components<ChatUsersDropdownProps> {
    static componentName = 'ChatUsersDropdown';

    constructor(props: ChatUsersDropdownProps) {
        super({
            events: {
                click: (e: PointerEvent) => {
                    e.preventDefault();

                    const dropDownElement = document.getElementById('myDropdown');
                    dropDownElement?.classList.toggle('show');
                },
            },
            clickAddUser: (e: PointerEvent) => {
                e.preventDefault();
                console.log('add');

                const overlay = document.querySelector('#overlay-modal');
                const modalElem = document.querySelector('.modal[data-modal="chats_user_create"]');

                modalElem.classList.add('active');
                overlay.classList.add('active');

                overlay.addEventListener('click', (e) => {
                    modalElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
            },
            clickRemoveUser: (e: PointerEvent) => {
                e.preventDefault();
                console.log('remove');

                const overlay = document.querySelector('#overlay-modal');
                const modalElem = document.querySelector('.modal[data-modal="chats_user_remove"]');

                modalElem.classList.add('active');
                overlay.classList.add('active');

                overlay.addEventListener('click', (e) => {
                    modalElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
