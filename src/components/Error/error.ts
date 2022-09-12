import Components from '../../utils/Components';
import templateBlank from './error.blank.hbs';
import template from './error.hbs';

export class Error extends Components {
    static componentName = 'Error';

    protected render() {
        if (this.props.isValid) {
            return this.compile(templateBlank, this.props);
        }

        return this.compile(template, this.props);
    }
}
