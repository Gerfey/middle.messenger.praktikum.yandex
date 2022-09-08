import Components from '../../utils/Components';
import template from './profile.hbs';
import './profile.scss';

export class ProfilePage extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
