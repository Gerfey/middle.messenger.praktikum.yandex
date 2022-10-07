import Components from '../../../utils/Components';
import template from './chatList.hbs';

interface ChatListProps {
    chatList: any;
    userInfo: any;
}

export class ChatList extends Components<ChatListProps> {
    static componentName = 'ChatList';

    constructor({chatList, userInfo}: ChatListProps) {
        super({chatList, userInfo});
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
