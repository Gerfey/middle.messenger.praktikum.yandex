import Components from '../../../utils/Components';
import template from './error.hbs';
import './error.scss';

export class Error404Page extends Components {
    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}
