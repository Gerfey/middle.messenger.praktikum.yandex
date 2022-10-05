import Components from '../../../utils/Components';
import template from './chatListItem.hbs';
import ChatsController from "../../../controllers/ChatsController";
import {withStore} from "../../../utils/Store";

interface ChatListItemProps {
    chatItem: any,
    userInformation: any
}

export class ChatListItem extends Components<ChatsItemProps> {
    static componentName = 'ChatListItem';

    constructor({chatItem, userInformation}: ChatListItemProps) {
        super({
            chatItem,
            userInformation,
            events: {
                click: () => {
                    ChatsController.selectedChatId(chatItem.id);
                }
            }});
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
