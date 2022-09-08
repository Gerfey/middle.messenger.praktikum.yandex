import Components from '../../utils/Components';
import template from './chat.hbs';
import './chat.scss';

export class ChatPage extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
