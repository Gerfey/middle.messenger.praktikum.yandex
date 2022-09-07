import template from './error.hbs';
import Components from '../../../utils/Components';
import './error.scss';

export class Error500Page extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}
