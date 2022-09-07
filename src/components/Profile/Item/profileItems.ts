import Components from '../../../utils/Components';
import template from './item.hbs';

interface ProfileItemsProps {
	className: string,
	name: string;
	type?: string;
	placeholder?: string;
	onFocus?: () => void;
	onBlur?: () => void;
}

export class ProfileItems extends Components<ProfileItemsProps> {
    static componentName = 'ProfileItems';

    constructor({onFocus, onBlur, ...props}: ProfileItemsProps) {
        super({
            ...props,
            events: {
                focus: onFocus,
                blur: onBlur,
            },
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
