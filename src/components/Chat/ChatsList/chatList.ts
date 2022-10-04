import Components from '../../../utils/Components';
import template from './chatList.hbs';

interface ChatListProps {
    chatsList: any;
    userInfo: any;
}

export class ChatList extends Components<ChatsProps> {
    static componentName = 'ChatList';

    constructor({chatsList, userInfo}: ChatListProps) {
        super({chatsList, userInfo});
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
