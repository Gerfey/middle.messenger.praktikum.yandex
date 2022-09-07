import template from './chat.hbs';
import Components from '../../utils/Components';
import './chat.scss';

export class ChatPage extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
